.PHONY: init clean start install web_init add_git_ignore 

SRC_SUB_DIRS= lib public views
PUBLIC_DIR = public
PUBLIC_SUB_DIRS = images scripts styles
VIEW_DIR = views
VIEWS_SUB_DIR = layout
SERVER_JS = server.js
DEFAULT_JSON = default.json

GIT_IGNORE =.gitignore
GIT_IGNORE_LST = *.swp *.out node_modules/ /bower_components/ *.log *.orig /target/coverage bundle.result.json

init : 
	mkdir -p $(PUBLIC_DIR)
	for dir_ in $(PUBLIC_SUB_DIRS); \
	do \
	   mkdir -p $(PUBLIC_DIR)/$$dir_ ; \
	done
	for dir_ in $(SRC_SUB_DIRS); \
	do \
	   mkdir -p $$dir_ ; \
	done
	mkdir -p $(VIEW_DIR)/$(VIEWS_SUB_DIR)
	touch $(SERVER_JS)
	

add_git_ignore :
	cat /dev/null > $(GIT_IGNORE)
	for i in $(GIT_IGNORE_LST) ; \
	do \
	    echo $$i >> $(GIT_IGNORE); \
	done

web_init :
	@echo "Initiating the node module"
	npm init

install :	
	npm install --save express

start :	
	node server.js

clean : 
	rm -rf node_modules
