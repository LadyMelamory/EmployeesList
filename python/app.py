import base64
import sqlite3

from flask import Flask, g, jsonify

app = Flask(__name__)


@app.route('/api/users/<offset>')
def api_users(offset: int = 0):
    encoding = 'utf-8'
    users = query_db('select * from users order by fio limit ?, 10', [offset])
    total_count = query_db('select count(*) from users')[0][0]
    return_mas = []

    for user in users:
        print(user[1], 'has the id', user[0])
        with open(user[2], "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
            return_mas.append({'id': user[0], 'fio': user[1], 'photo': encoded_string.decode(encoding)})
    return jsonify({'users': return_mas, 'total_count': total_count})


def get_db():
    database = './office.db'
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(database)
    return db


def query_db(query, args=(), one=False):
    print(query)
    print(args)
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


if __name__ == '__main__':
    app.run()
