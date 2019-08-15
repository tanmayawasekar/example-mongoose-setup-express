import random
from fabric.contrib.files import append, exists
from fabric.api import cd, env, local, run, settings
import re

REPO_URL = 'https://github.com/tanmayawasekar/example-mongoose-setup-express.git'  

def deploy():
    site_folder = f'/home/ubuntu/sites/ec2-13-235-70-206.ap-south-1.compute.amazonaws.com'  
    run(f'mkdir -p {site_folder}')  
    with cd(site_folder):  
        _install_docker()
        _get_latest_source()
        _build_docker_image()
        # _update_virtualenv()
        # _create_or_update_dotenv()
        # _update_static_files()
        # _update_database()

def _build_docker_image():
    run("docker build -t tanmayawasekar/kitchen-display-ordering .")
    run("docker run -p 49160:8080 -d tanmayawasekar/node-web-app")


def _get_latest_source():
    if exists('.git'):  
        run('git pull origin master')  
    else:
        run(f'git clone {REPO_URL} .')  
    
def _install_docker():
    output = local('docker -v', capture=True)
    match = re.search(r'build', output)
    if match and 'build' in match.group(0).lower():
        pass
    else:
        run('curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -')
        run('sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"')
        run('sudo apt-get update')
        run('sudo apt-get install -y docker-ce')

def is_package_installed(pkgname):
    output = local('dpkg -s {}'.format(pkgname), capture=True)
    match = re.search(r'Status: (\w+.)*', output)
    if match and 'installed' in match.group(0).lower():
        return True
    return False
