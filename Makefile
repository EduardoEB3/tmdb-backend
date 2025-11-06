APP_NAME=tmdb-backend
DOCKER_IMAGE=$(APP_NAME):latest
CONTAINER_NAME=$(APP_NAME)-container

build:
	docker build -t $(DOCKER_IMAGE) .

run:
	docker run --rm -it -p 3000:3000 --name $(CONTAINER_NAME) --env-file .env $(DOCKER_IMAGE)

clean:
	docker rm -f $(CONTAINER_NAME) || true
	docker rmi -f $(DOCKER_IMAGE) || true
	docker system prune -f

test:
	npm run test

lint:
	npm run lint
