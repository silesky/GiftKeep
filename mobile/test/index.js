const
  test_setup = require('./misc/test_setup'),
  test_actions_async = require('./misc/test_actions_async'),
  test_utils = require('./misc/test_utils'),
  test_store = require('./misc/test_store'),
  test_reducers = require('./misc/test_reducers')

test_utils()
test_store()
test_setup()
test_actions_async()
test_reducers()
