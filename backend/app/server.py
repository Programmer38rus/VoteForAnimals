import time
import bottle

from scripts.increase_cats import add_animal_vote

from scripts.list_results import results


def create_app():
    app = bottle.Bottle()
    app.config.load_config('sse_server.conf')

    app.config.setdefault('server', 'waitress')
    app.config.setdefault('host', 'localhost')
    app.config.setdefault('port', 9090)

    return app


app = create_app()

@app.route("/vote/<animal>", method="POST")
def start(animal):

    return add_animal_vote(animal)


@app.route('/vote/stats')
def stats_spammer():
    bottle.response.content_type = "text/event-stream"
    bottle.response.cache_control = "no-cache"
    bottle.response.headers['Access-Control-Allow-Origin'] = '*'



    while True:
        vote_stat = results()

        yield 'data: %s\n\n' % vote_stat
        time.sleep(2)

@app.route('/words')
def word_spammer():
    bottle.response.content_type = "text/event-stream"
    bottle.response.cache_control = "no-cache"
    bottle.response.headers['Access-Control-Allow-Origin'] = '*'

    words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
    for word in words:
        yield "data: %s\n\n" % word
        time.sleep(2)

