import 'package:hive/hive.dart';
import '../models/scheme.dart';
import '../config/constants.dart';

class OfflineService {
  static late Box _schemesBox;
  static late Box _userDataBox;
  static late Box _settingsBox;

  static Future<void> initialize() async {
    _schemesBox = await Hive.openBox('schemes');
    _userDataBox = await Hive.openBox('user_data');
    _settingsBox = await Hive.openBox('settings');
  }

  // Schemes caching
  Future<void> cacheSchemes(List<Scheme> schemes) async {
    try {
      final schemesJson = schemes.map((s) => s.toJson()).toList();
      await _schemesBox.put('all_schemes', schemesJson);
      await _schemesBox.put('last_updated', DateTime.now().toIso8601String());
    } catch (e) {
      print('Error caching schemes: $e');
    }
  }

  Future<List<Scheme>?> getCachedSchemes() async {
    try {
      final lastUpdated = _schemesBox.get('last_updated');
      if (lastUpdated != null) {
        final lastUpdateTime = DateTime.parse(lastUpdated);
        final now = DateTime.now();
        
        // Check if cache is expired
        if (now.difference(lastUpdateTime) > AppConstants.cacheDuration) {
          return null;
        }
      }

      final schemesJson = _schemesBox.get('all_schemes');
      if (schemesJson != null) {
        final List<dynamic> jsonList = schemesJson;
        return jsonList.map((json) => Scheme.fromJson(json)).toList();
      }
      return null;
    } catch (e) {
      print('Error getting cached schemes: $e');
      return null;
    }
  }

  Future<void> cacheScheme(Scheme scheme) async {
    try {
      await _schemesBox.put('scheme_${scheme.id}', scheme.toJson());
    } catch (e) {
      print('Error caching scheme: $e');
    }
  }

  Future<Scheme?> getCachedScheme(String id) async {
    try {
      final schemeJson = _schemesBox.get('scheme_$id');
      if (schemeJson != null) {
        return Scheme.fromJson(schemeJson);
      }
      return null;
    } catch (e) {
      print('Error getting cached scheme: $e');
      return null;
    }
  }

  // User data caching
  Future<void> cacheUserData(String key, dynamic data) async {
    try {
      await _userDataBox.put(key, data);
    } catch (e) {
      print('Error caching user data: $e');
    }
  }

  Future<dynamic> getCachedUserData(String key) async {
    try {
      return _userDataBox.get(key);
    } catch (e) {
      print('Error getting cached user data: $e');
      return null;
    }
  }

  // Settings
  Future<void> saveSetting(String key, dynamic value) async {
    try {
      await _settingsBox.put(key, value);
    } catch (e) {
      print('Error saving setting: $e');
    }
  }

  Future<dynamic> getSetting(String key) async {
    try {
      return _settingsBox.get(key);
    } catch (e) {
      print('Error getting setting: $e');
      return null;
    }
  }

  // Clear cache
  Future<void> clearAllCache() async {
    try {
      await _schemesBox.clear();
      await _userDataBox.clear();
      print('Cache cleared successfully');
    } catch (e) {
      print('Error clearing cache: $e');
    }
  }

  Future<void> clearSchemeCache() async {
    try {
      await _schemesBox.clear();
      print('Scheme cache cleared');
    } catch (e) {
      print('Error clearing scheme cache: $e');
    }
  }

  // Check if data is available offline
  Future<bool> isDataAvailableOffline() async {
    try {
      final schemes = await getCachedSchemes();
      return schemes != null && schemes.isNotEmpty;
    } catch (e) {
      return false;
    }
  }
}
