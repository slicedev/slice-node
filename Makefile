all: install

install:
	npm install

test:
	@./node_modules/.bin/mocha

clean:
	rm -rf node_modules/ build/

.PHONY: test
