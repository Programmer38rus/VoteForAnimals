import sqlalchemy as sa

from app.db import vote_results

# if __name__ == "__main__":

def add_animal_vote(animal):
    """
    Функция для того чтобы принять название животного, найти его в базе и обновить значение (количество голосов)
    :param animal:
    :return:
    """


    # engine = sa.create_engine("sqlite:///scripts/my_db.sqlite")
    engine = sa.create_engine("sqlite:///my_db.sqlite")





    with engine.begin() as connection:
        select = vote_results.select().where(vote_results.c.name == animal)
        results = connection.execute(select)

        id, _, votes = results.fetchone()

        new_votes = votes + 1
        update = (
            vote_results.update().values(votes=new_votes).where(vote_results.c.id == id)
        )
        connection.execute(update)