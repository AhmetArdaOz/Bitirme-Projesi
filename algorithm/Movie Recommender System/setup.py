from setuptools import setup

with open("README.md","r", encoding="utf8") as fh:
    long_description = fh.read()

AUTHOR_NAME ='UTKU'
SRC_REPO = 'src'
LIST_OF_REQUIREMENTS = ['streamlit']

setup(
    name ='SRC_REPO',
    version = '0.0.1',
    author = AUTHOR_NAME,
    author_email = 'kazimutkucitoglu@gmail.com',
    description = 'A small package for movies recommendation',
    long_description = long_description,
    long_description_content_type = 'text/markdown',
    package = [SRC_REPO],
    python_version = '>=3.7',
    install_requires = LIST_OF_REQUIREMENTS,
)