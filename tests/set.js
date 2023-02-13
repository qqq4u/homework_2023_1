'use strict';

QUnit.module('Тестируем функцию set', function () {
	QUnit.test('set работает правильно c объектами с существующими свойствами', function (assert) {
		const object = {
			deep: {
				hested: {
					field: 'baz'
				}
			}
		};

		const object2 = {
			deep: {
				hested: {
					field: 42
				}
			}
		};

		const object3 = {
			deep: {
				hested: {
					foo: 'bar'
				}
			}
		};

		const object4 = {
			deep: null
		};

		assert.deepEqual(set({foo: 'bar'}, '.foo', 'baz'), {foo: 'baz'});
		assert.deepEqual(set(object, '.deep.hested.field', 42), object2);

		assert.deepEqual(set(object, '.deep.hested', {foo: 'bar'}), object3);
		assert.deepEqual(set(object, '.deep', null), object4);
	});

	QUnit.test('set изменяет переданный объект', function (assert) {
		const object = {
			foo: 'bar'
		};

		const object1 = {
			foo: 'baz'
		};

		const object2 = set(object, '.foo', 'baz');
		assert.deepEqual(object, object1);
		assert.deepEqual(object2, object1);
	});

	QUnit.test('set работает правильно c массивами', function (assert) {
		const object1 = {
			foo: [ 1, 2, 3 ],
			bar: [
				{foobar: '42'}
			]
		};

		const object2 = {
			foo: [ 1, 2, 3 ],
			bar: [
				{foobar: '42'}
			]
		};

		const new1 = {
			foo: [ 42, 2, 3 ],
			bar: [
				{foobar: '42'}
			]
		};

		const new2 = {
			foo: [ 1, 2, 3 ],
			bar: [
				{foobar: 'baz'}
			]
		};

		assert.deepEqual(set(object1, '.foo.0', 42), new1);
		assert.deepEqual(set(object2, '.bar.0.foobar', 'baz'), new2);
	});

	QUnit.test('set работает правильно c объектами без свойств', function (assert) {
		const object = {
			deep: {
				nested: {
					field: null
				}
			}
		};

		assert.deepEqual(set({}, '.deep.nested.field', null), object);
	});

	QUnit.test('set работает правильно c объектами, в которых есть не все необходимые свойства', function (assert) {
		const object = {
			deep: {
				nested: {
					field: null
				}
			},
			deep2: {
				nested2: {
					field: null
				}
			}
		};

		const object1 = {
			deep: null,
			deep2: {
				nested2: {
					field: null
				}
			}
		};


		assert.deepEqual(set(object1, '.deep.nested.field', null), object);
	});

	QUnit.test('set работает правильно c полями, используя массивы', function (assert) {
		const object = {
			foo: null,
		};

		const object1 = {
			foo: [42, 24, 30]
		};


		assert.deepEqual(set(object, '.foo', [42, 24, 30]), object1);
	});
	
	QUnit.test('set работает правильно при вставке сложной структуры в пустой массив', function (assert) {
		const object = {
			foo: []
		}

		const object1 = {
			foo: [{
				nested: {
					field: ["I", "love", "technopark!"]
				}
			}]
		};


		assert.deepEqual(set(object, '.foo.0', {
			nested:
				{ field: ["I", "love", "technopark!"] }
		}), object1);
	});
	
	QUnit.test('set выбрасывает ошибку при неправильном формате ввода', function (assert){
		const object = {
			foo: 'bar'
		};
	
		const object1 = {
			foo: 'baz'
		};

		assert.throws (()=>set(object,object,'baz'), new TypeError('Path need to be a string!'));
		assert.throws (()=>set(object,NaN,'baz'),new TypeError('Path need to be a string!'));
		assert.throws (()=>set(object,123243223,'baz'),new TypeError('Path need to be a string!'));
		assert.throws (()=>set(object,null,'baz'),new TypeError('Path need to be a string!'));
		assert.throws (()=>set(object,undefined,'baz'),new TypeError('Path need to be a string!'));

		assert.throws (()=>set(undefined,'.foo','baz'),new TypeError('Wrong object type'));
		assert.throws (()=>set(NaN,'.foo','baz'),new TypeError('Wrong object type'));
		assert.throws (()=>set((value) => {return value},'.foo','baz'),new TypeError('Wrong object type'));
		assert.throws (()=>set(null,'.foo','baz'),new TypeError('Wrong object type'));


		assert.throws (()=>set(object,'.foo',Math.sqrt(-1)),new TypeError('Wrong value type'));
		assert.throws (()=>set(object,'.foo',undefined),new TypeError('Wrong value type'));
		assert.throws (()=>set(object,'.foo',(value) => {return value}),new TypeError('Wrong value type'));
	});
});
