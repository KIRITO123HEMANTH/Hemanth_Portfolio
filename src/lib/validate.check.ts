// Run: npm run check
import assert from 'node:assert/strict'
import { EMPTY, validate } from './validate.ts'

const ok = { ...EMPTY, name: 'Asha', email: 'asha@example.com', type: 'Landing page', details: 'A landing page for our new bakery launch.' }
assert.deepEqual(validate(ok), {})
assert.deepEqual(Object.keys(validate(EMPTY)).sort(), ['details', 'email', 'name', 'type'])
assert.ok(validate({ ...ok, email: 'asha@example' }).email)
assert.ok(validate({ ...ok, email: ' asha@example.com ' }).email === undefined)
assert.ok(validate({ ...ok, details: 'x'.repeat(5001) }).details)
assert.ok(validate({ ...ok, name: ' ' }).name)
console.log('validate: ok')
