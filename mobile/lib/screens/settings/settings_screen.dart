import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/language_provider.dart';
import '../../providers/theme_provider.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final languageProvider = context.watch<LanguageProvider>();
    final themeProvider = context.watch<ThemeProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text(languageProvider.translate('settings')),
      ),
      body: ListView(
        children: [
          // Appearance Section
          _buildSectionHeader(context, 'Appearance'),
          
          SwitchListTile(
            secondary: Icon(
              themeProvider.isDarkMode ? Icons.dark_mode : Icons.light_mode,
            ),
            title: const Text('Dark Mode'),
            subtitle: const Text('Enable dark theme'),
            value: themeProvider.isDarkMode,
            onChanged: (value) {
              themeProvider.toggleTheme();
            },
          ),
          
          ListTile(
            leading: const Icon(Icons.language),
            title: const Text('Language'),
            subtitle: Text(languageProvider.currentLanguage),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => _showLanguageDialog(context),
          ),
          
          const Divider(),
          
          // Notifications Section
          _buildSectionHeader(context, 'Notifications'),
          
          SwitchListTile(
            secondary: const Icon(Icons.notifications),
            title: const Text('Push Notifications'),
            subtitle: const Text('Receive updates about your applications'),
            value: true,
            onChanged: (value) {
              // Toggle push notifications
            },
          ),
          
          SwitchListTile(
            secondary: const Icon(Icons.email),
            title: const Text('Email Notifications'),
            subtitle: const Text('Receive email updates'),
            value: true,
            onChanged: (value) {
              // Toggle email notifications
            },
          ),
          
          SwitchListTile(
            secondary: const Icon(Icons.campaign),
            title: const Text('Promotional Notifications'),
            subtitle: const Text('Receive news about new schemes'),
            value: false,
            onChanged: (value) {
              // Toggle promotional notifications
            },
          ),
          
          const Divider(),
          
          // Privacy & Security Section
          _buildSectionHeader(context, 'Privacy & Security'),
          
          ListTile(
            leading: const Icon(Icons.fingerprint),
            title: const Text('Biometric Authentication'),
            subtitle: const Text('Use fingerprint or face ID'),
            trailing: Switch(
              value: false,
              onChanged: (value) {
                // Toggle biometric auth
              },
            ),
          ),
          
          ListTile(
            leading: const Icon(Icons.lock),
            title: const Text('Change Password'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to change password
            },
          ),
          
          ListTile(
            leading: const Icon(Icons.privacy_tip),
            title: const Text('Privacy Policy'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Open privacy policy
            },
          ),
          
          const Divider(),
          
          // Data & Storage Section
          _buildSectionHeader(context, 'Data & Storage'),
          
          ListTile(
            leading: const Icon(Icons.download),
            title: const Text('Download Data'),
            subtitle: const Text('Download your personal data'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Download user data
            },
          ),
          
          ListTile(
            leading: const Icon(Icons.delete_sweep),
            title: const Text('Clear Cache'),
            subtitle: const Text('Free up storage space'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () => _showClearCacheDialog(context),
          ),
          
          const Divider(),
          
          // About Section
          _buildSectionHeader(context, 'About'),
          
          ListTile(
            leading: const Icon(Icons.info),
            title: const Text('About App'),
            subtitle: const Text('Version 1.0.0'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Show about dialog
              _showAboutDialog(context);
            },
          ),
          
          ListTile(
            leading: const Icon(Icons.description),
            title: const Text('Terms of Service'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Open terms of service
            },
          ),
          
          ListTile(
            leading: const Icon(Icons.help),
            title: const Text('Help & Support'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Open help center
            },
          ),
          
          ListTile(
            leading: const Icon(Icons.rate_review),
            title: const Text('Rate App'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Open app store for rating
            },
          ),
          
          const Divider(),
          
          // Danger Zone
          _buildSectionHeader(context, 'Danger Zone'),
          
          ListTile(
            leading: const Icon(Icons.delete_forever, color: Colors.red),
            title: const Text(
              'Delete Account',
              style: TextStyle(color: Colors.red),
            ),
            subtitle: const Text('Permanently delete your account'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.red),
            onTap: () => _showDeleteAccountDialog(context),
          ),
          
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.bold,
          color: Theme.of(context).primaryColor,
        ),
      ),
    );
  }

  void _showLanguageDialog(BuildContext context) {
    final languageProvider = context.read<LanguageProvider>();
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Select Language'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              'English',
              'हिंदी (Hindi)',
              'मराठी (Marathi)',
              'বাংলা (Bengali)',
              'తెలుగు (Telugu)',
              'தமிழ் (Tamil)',
              'ગુજરાતી (Gujarati)',
              'ಕನ್ನಡ (Kannada)',
              'മലയാളം (Malayalam)',
              'ਪੰਜਾਬੀ (Punjabi)',
              'ଓଡ଼ିଆ (Odia)',
              'অসমীয়া (Assamese)',
            ].map((lang) {
              final langCode = _getLanguageCode(lang);
              return RadioListTile<String>(
                title: Text(lang),
                value: langCode,
                groupValue: languageProvider.currentLanguage,
                onChanged: (value) {
                  if (value != null) {
                    languageProvider.setLanguage(value);
                    Navigator.pop(context);
                  }
                },
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  String _getLanguageCode(String language) {
    final map = {
      'English': 'en',
      'हिंदी (Hindi)': 'hi',
      'मराठी (Marathi)': 'mr',
      'বাংলা (Bengali)': 'bn',
      'తెలుగు (Telugu)': 'te',
      'தமிழ் (Tamil)': 'ta',
      'ગુજરાતી (Gujarati)': 'gu',
      'ಕನ್ನಡ (Kannada)': 'kn',
      'മലയാളം (Malayalam)': 'ml',
      'ਪੰਜਾਬੀ (Punjabi)': 'pa',
      'ଓଡ଼ିଆ (Odia)': 'or',
      'অসমীয়া (Assamese)': 'as',
    };
    return map[language] ?? 'en';
  }

  void _showClearCacheDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Clear Cache'),
        content: const Text('This will clear all cached data. Are you sure?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              // Clear cache
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Cache cleared successfully')),
              );
            },
            child: const Text('Clear'),
          ),
        ],
      ),
    );
  }

  void _showAboutDialog(BuildContext context) {
    showAboutDialog(
      context: context,
      applicationName: 'Government Help Platform',
      applicationVersion: '1.0.0',
      applicationIcon: const Icon(Icons.account_balance, size: 48),
      children: [
        const Text(
          'Access 40+ government schemes and services in 12 Indian languages.',
        ),
        const SizedBox(height: 16),
        const Text('© 2024 Government Help Platform'),
      ],
    );
  }

  void _showDeleteAccountDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Account'),
        content: const Text(
          'This action cannot be undone. All your data will be permanently deleted. Are you sure?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              // Delete account
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
            ),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }
}
