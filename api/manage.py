import os, sys
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

ROOT_PATH = os.path.dirname('/'.join(os.path.abspath(__file__).split('/')[:-1] + ['src']))
sys.path.insert(1, ROOT_PATH)


from main import create_app, db

app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
app.app_context().push()

manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run()

if __name__ == '__main__':
    manager.run()