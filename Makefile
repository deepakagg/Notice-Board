export NODE_ENV=development

test:
	echo "Starting test cases"
ifneq ($(module),)
	-@DEBUG=$(module) ./node_modules/.bin/mocha "Application/$(module)/test.js"
else
	-@./node_modules/.bin/mocha "Application/*/test.js"
endif
	mongo ida --eval "db.dropDatabase();"
	echo 'successfully'

.PHONY: test
