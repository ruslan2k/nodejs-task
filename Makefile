APP := short_url

default: db.sq3
	npm install
	node server.js

db.sq3:
	npm install
	node init-db.js

docker:
	docker run -i -t --rm --name $(APP) -p 3000:3000 \
		-v `pwd`:/opt/$(APP) node:4 \
		make -C /opt/$(APP)

attach: daemon
	docker  exec  -i -t  $(APP)  bash

daemon:
	docker ps -a
	-docker  run  -t -d --name $(APP) -p 3000:3000 \
		 -v `pwd`:/opt/$(APP) node:4 \
		 bash

clean:
	docker stop $(APP)
	docker rm   $(APP)
