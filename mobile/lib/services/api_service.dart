import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../models/scheme.dart';
import '../models/application.dart';
import '../config/constants.dart';

class ApiService {
  late final Dio _dio;

  ApiService() {
    _dio = Dio(
      BaseOptions(
        baseUrl: dotenv.env['API_BASE_URL'] ?? AppConstants.apiBaseUrl,
        connectTimeout: AppConstants.connectionTimeout,
        receiveTimeout: AppConstants.apiTimeout,
        headers: {
          'Content-Type': 'application/json',
        },
      ),
    );

    // Add interceptors for logging and error handling
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          print('REQUEST[${options.method}] => PATH: ${options.path}');
          return handler.next(options);
        },
        onResponse: (response, handler) {
          print('RESPONSE[${response.statusCode}] => DATA: ${response.data}');
          return handler.next(response);
        },
        onError: (error, handler) {
          print('ERROR[${error.response?.statusCode}] => MESSAGE: ${error.message}');
          return handler.next(error);
        },
      ),
    );
  }

  // Schemes
  Future<List<Scheme>> getSchemes({
    String? category,
    String? state,
    String? search,
  }) async {
    try {
      final response = await _dio.get(
        AppConstants.schemesEndpoint,
        queryParameters: {
          if (category != null) 'category': category,
          if (state != null) 'state': state,
          if (search != null) 'search': search,
        },
      );

      final List<dynamic> data = response.data;
      return data.map((json) => Scheme.fromJson(json)).toList();
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Scheme> getSchemeById(String id) async {
    try {
      final response = await _dio.get('${AppConstants.schemesEndpoint}/$id');
      return Scheme.fromJson(response.data);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Applications
  Future<List<Application>> getApplications(String userId) async {
    try {
      final response = await _dio.get(
        AppConstants.applicationsEndpoint,
        queryParameters: {'user_id': userId},
      );

      final List<dynamic> data = response.data;
      return data.map((json) => Application.fromJson(json)).toList();
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Application> createApplication({
    required String userId,
    required String schemeId,
  }) async {
    try {
      final response = await _dio.post(
        AppConstants.applicationsEndpoint,
        data: {
          'user_id': userId,
          'scheme_id': schemeId,
          'status': 'pending',
        },
      );

      return Application.fromJson(response.data);
    } catch (e) {
      throw _handleError(e);
    }
  }

  Future<Application> updateApplicationStatus({
    required String applicationId,
    required ApplicationStatus status,
    String? notes,
  }) async {
    try {
      final response = await _dio.patch(
        '${AppConstants.applicationsEndpoint}/$applicationId',
        data: {
          'status': status.toString().split('.').last,
          if (notes != null) 'notes': notes,
        },
      );

      return Application.fromJson(response.data);
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Error handling
  String _handleError(dynamic error) {
    if (error is DioException) {
      switch (error.type) {
        case DioExceptionType.connectionTimeout:
        case DioExceptionType.sendTimeout:
        case DioExceptionType.receiveTimeout:
          return 'Connection timeout. Please check your internet connection.';
        case DioExceptionType.badResponse:
          return error.response?.data['message'] ?? 'Server error occurred.';
        case DioExceptionType.cancel:
          return 'Request was cancelled.';
        default:
          return 'Network error. Please try again.';
      }
    }
    return error.toString();
  }
}
