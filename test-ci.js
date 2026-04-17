// CI TEST SCRIPT
// Starts server, runs tests, then stops server
import { spawn } from 'child_process';
import http from 'http';

let serverProcess;

// Helper function to make requests
function makeRequest(method, path, data = null) {
 return new Promise((resolve, reject) => {
 const options = {
 hostname: 'localhost',
 port: 3000,
 path: path,
 method: method,
 headers: {
 'Content-Type': 'application/json'
 }
 };
 const req = http.request(options, (res) => {
 let body = '';
 res.on('data', (chunk) => body += chunk);
 res.on('end', () => {
 try {
 resolve({
 status: res.statusCode,
 body: JSON.parse(body)
 });
 } catch (e) {
 resolve({
 status: res.statusCode,
 body: body
 });
 }
 });
 });
 req.on('error', reject);
 if (data) {
 req.write(JSON.stringify(data));
 }
 req.end();
 });
}

// Wait for server to be ready
function waitForServer(maxAttempts = 10) {
 return new Promise((resolve, reject) => {
 let attempts = 0;

 const checkServer = () => {
 attempts++;
 makeRequest('GET', '/health')
 .then(() => resolve())
 .catch(() => {
 if (attempts >= maxAttempts) {
 reject(new Error('Server failed to start'));
 } else {
 setTimeout(checkServer, 500);
 }
 });
 };

 checkServer();
 });
}

// Test all endpoints
async function testAPI() {
 console.log('🚀 Starting API tests...\n');

 try {
 // Test 1: Health check
 console.log(' GET /health');
 let result = await makeRequest('GET', '/health');
 console.log('Status:', result.status);
 if (result.status !== 200) throw new Error('Health check failed');

 // Test 2: GET all events
 console.log(' GET /api/events');
 result = await makeRequest('GET', '/api/events');
 console.log('Status:', result.status, '| Events:', result.body.count);

 // Test 3: CREATE event
 console.log(' POST /api/events');
 result = await makeRequest('POST', '/api/events', {
 title: 'Docker Masterclass',
 date: '2026-06-01',
 location: 'Sfax',
 capacity: 35
 });
 console.log('Status:', result.status);
 if (result.status !== 201) throw new Error('Create event failed');

 // Test 4: GET single event
 console.log(' GET /api/events/1');
 result = await makeRequest('GET', '/api/events/1');
 console.log('Status:', result.status);

 // Test 5: UPDATE event
 console.log(' PUT /api/events/1');
 result = await makeRequest('PUT', '/api/events/1', {
 title: 'Advanced JavaScript Workshop'
 });
 console.log('Status:', result.status);
 if (result.status !== 200) throw new Error('Update event failed');

 // Test 6: Error handling (invalid data)
 console.log(' POST /api/events (invalid data)');
 result = await makeRequest('POST', '/api/events', {
 title: 'Incomplete Event'
 // Missing required fields
 });
 console.log('Status:', result.status);
 if (result.status !== 400) throw new Error('Validation should fail');

 // Test 7: 404 error
 console.log(' GET /api/events/999');
 result = await makeRequest('GET', '/api/events/999');
 console.log('Status:', result.status);
 if (result.status !== 404) throw new Error('Should return 404');

 console.log('\n✅ All tests passed!');
 return true;

 } catch (error) {
 console.error('❌ Test failed:', error.message);
 return false;
 }
}

// Main test runner
async function runTests() {
 console.log('═══════════════════════════════════════');
 console.log('🧪 CI TESTING EVENT MANAGER API');
 console.log('═══════════════════════════════════════\n');

 try {
 // Start server
 console.log('🔄 Starting server...');
 serverProcess = spawn('node', ['server.js'], {
 stdio: ['pipe', 'pipe', 'pipe'],
 detached: true
 });

 // Wait for server to start
 await waitForServer();
 console.log('✅ Server started on port 3000\n');

 // Run tests
 const success = await testAPI();

 // Cleanup
 console.log('\n🔄 Stopping server...');
 if (serverProcess) {
 process.kill(-serverProcess.pid);
 }

 if (success) {
 console.log('═══════════════════════════════════════');
 console.log('🎉 CI TESTS PASSED!');
 console.log('═══════════════════════════════════════');
 process.exit(0);
 } else {
 console.log('═══════════════════════════════════════');
 console.log('💥 CI TESTS FAILED!');
 console.log('═══════════════════════════════════════');
 process.exit(1);
 }

 } catch (error) {
 console.error('💥 CI setup failed:', error.message);
 if (serverProcess) {
 process.kill(-serverProcess.pid);
 }
 process.exit(1);
 }
}

// Handle process termination
process.on('SIGINT', () => {
 if (serverProcess) {
 process.kill(-serverProcess.pid);
 }
 process.exit(0);
});

process.on('SIGTERM', () => {
 if (serverProcess) {
 process.kill(-serverProcess.pid);
 }
 process.exit(0);
});

// Run the tests
runTests();