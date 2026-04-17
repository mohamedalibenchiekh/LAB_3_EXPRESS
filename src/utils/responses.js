// RESPONSE HELPER
// Standardized response formats
export class ApiResponse {
 static success(data, message = "Success") {
 return {
 success: true,
 message,
 data,
 timestamp: new Date().toISOString()
 };
 }
 static error(message = "Error", data = null) {
 return {
 success: false,
 message,
 data,
 timestamp: new Date().toISOString()
 };
 }
 static paginated(data, page, limit, total) {
 return {
 success: true,
 data,
 pagination: {
 page,
 limit,
 total,
 pages: Math.ceil(total / limit)
 }
 };
 }
}