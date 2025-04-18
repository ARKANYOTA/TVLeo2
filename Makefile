docker:
	sudo docker rm -f TVLeo2 && sudo docker compose --env-file .env up -d --build
