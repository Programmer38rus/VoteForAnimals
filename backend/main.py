import bottle
import os

from app.server import app
from scripts.create_db import create

PATH = "my_db.sqlite"

if __name__ == "__main__":

    if os.path.exists(PATH) is False:
        create()


    bottle.run(
        app=app, host=app.config.host, port=app.config.port, server=app.config.server
    )