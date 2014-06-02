from fabric.api import *
import os

env.hosts = ['']
env.user = ''

def pack():
    pass


def deploy():
    pass

def dev():
    local('nodemon -e "jade,less,js,php" -w index.php -w js -w less -w views -x python /usr/local/bin/fab compile')

def compile():
    css()
    jade()
    local('cp index.php dist/index.php')
    local('cp development.php production.php dist/')
    local('cp js/main.js dist/js/main.js')

def css():
    local('lessc --strict-imports less/main.less > dist/css/main.css')

def jade():
    local('jade -o dist/templates views')

