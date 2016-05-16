import os


basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'ITAKE_2016_PDT_PYTHON_PRODUCTION_DATABASE_URI'
    )


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'ITAKE_2016_PDT_PYTHON_DEVELOPMENT_DATABASE_URI'
    )
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://@localhost:3306/ideaspaces'


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'ITAKE_2016_PDT_PYTHON_TESTING_DATABASE_URI'
    )


config = {
    'production': ProductionConfig,
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'default': ProductionConfig,
}
