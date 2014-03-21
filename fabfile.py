from fabric.api import *

env.hosts = ['']
env.user = ''

def pack():
    pass


def deploy():
    pass

def dev():
    local('nodemon -e ".jade|.less|.js" -w . -x python /usr/local/bin/fab compile')

def compile():
    css()
    jade()
    local('cp js/main.js dist/js/main.js')

def css():
    local('lessc --strict-imports less/main.less > dist/css/main.css')

def jade():
    local('jade -o dist views')

