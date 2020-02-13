#!make
# ------------------------------------------------------------------------------
# Makefile -- Typeorm Practice
# ------------------------------------------------------------------------------



# Set environment variables for local development or CI/CD pipelines
include .env

ifndef PROJECT
   $(error The PROJECT variable is missing.)
endif


DIR := ${CURDIR}

all 		: help
.DEFAULT 	: help
.PHONY	    : local production tests workspace ftp-server database seed-database close-local close-production close-gitlab print-status

# ------------------------------------------------------------------------------
# Task Aliases
# ------------------------------------------------------------------------------

local:      | build-local run-local         ## Task-Alias -- Run the steps for a local-build.
local-dev: | run-local ## Task-Alias -- Run the steps for a production build.

# ------------------------------------------------------------------------------
# Status Output
# ------------------------------------------------------------------------------

print-status:
	@echo " +---------------------------------------------------------+ "
	@echo " | Current Settings                                        | "
	@echo " +---------------------------------------------------------+ "
	@echo " | PROJECT:      $(PROJECT) "
	@echo " | BRANCH:       $(GIT_LOCAL_BRANCH) "
	@echo " +---------------------------------------------------------+ "
	@echo " | BUILD_TARGET: $(BUILD_TARGET) "
	@echo " +---------------------------------------------------------+ "
	
	@echo " +---------------------------------------------------------+ "
	@echo " | Docker-Compose Config Output "
	@echo " +---------------------------------------------------------+ "
	@docker-compose -f docker/docker-compose.yml config
	@echo " +---------------------------------------------------------+ "

# ------------------------------------------------------------------------------
# Development Commands
# ------------------------------------------------------------------------------



build-local: ## -- Target : Builds the local development containers.
	@echo "+\n++ Make: Building local Docker image ...\n+"
	@docker-compose -f docker/docker-compose.yml build

run-local: ## -- Target : Runs the local development containers.
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker/docker-compose.yml up -d

close-local: ## -- Target : Closes the local development containers.
	@echo "+\n++ Make: Closing local container ...\n+"
	@docker-compose -f docker/docker-compose.yml down


# ------------------------------------------------------------------------------
# Helper Commands
# ------------------------------------------------------------------------------

log:  ## <Helper> :: Executes into the workspace container.
	@echo "Make: Shelling into local workspace ..."
	@docker-compose -f docker/docker-compose.yml logs -f app

application:  ## <Helper> :: Executes into the application container.
	@echo "Make: Shelling into local application ..."
	@docker-compose -f docker/docker-compose.yml exec app /bin/sh


database: ## <Helper> :: Executes into database container.
	@echo "Make: Shelling into local database container ..."
	@docker-compose -f docker/docker-compose.yml exec postgres psql -U me -W testDb

help:  ## ** Display this help screen.
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'