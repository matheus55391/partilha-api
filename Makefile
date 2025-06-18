# Ambiente de desenvolvimento (preferencial)
dev-up:
	docker compose -f docker/dev/docker-compose.yml up --build

dev-down:
	docker compose -f docker/dev/docker-compose.yml down

dev-logs:
	docker compose -f docker/dev/docker-compose.yml logs -f

dev-prisma-migrate:
	docker compose -f docker/dev/docker-compose.yml exec app npx prisma migrate dev

dev-prisma-generate:
	docker compose -f docker/dev/docker-compose.yml exec app npx prisma generate

# Subir apenas o banco de dados local
db-up:
	docker compose -f docker/database/docker-compose.yml up -d

db-down:
	docker compose -f docker/database/docker-compose.yml down

