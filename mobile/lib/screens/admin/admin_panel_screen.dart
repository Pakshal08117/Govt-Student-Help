import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/language_provider.dart';

class AdminPanelScreen extends StatelessWidget {
  const AdminPanelScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final languageProvider = context.watch<LanguageProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text(languageProvider.translate('admin_panel')),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              // Refresh data
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Statistics Cards
            Padding(
              padding: const EdgeInsets.all(16),
              child: GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                childAspectRatio: 1.5,
                children: [
                  _buildStatCard(
                    context,
                    '1,234',
                    'Total Users',
                    Icons.people,
                    Colors.blue,
                  ),
                  _buildStatCard(
                    context,
                    '567',
                    'Applications',
                    Icons.description,
                    Colors.green,
                  ),
                  _buildStatCard(
                    context,
                    '89',
                    'Pending Reviews',
                    Icons.pending,
                    Colors.orange,
                  ),
                  _buildStatCard(
                    context,
                    '42',
                    'Today\'s Activity',
                    Icons.today,
                    Colors.purple,
                  ),
                ],
              ),
            ),
            
            const Divider(),
            
            // Quick Actions
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Quick Actions',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildActionTile(
                    context,
                    'Manage Users',
                    Icons.people_outline,
                    Colors.blue,
                    () {},
                  ),
                  _buildActionTile(
                    context,
                    'Review Applications',
                    Icons.rate_review,
                    Colors.green,
                    () {},
                  ),
                  _buildActionTile(
                    context,
                    'Manage Schemes',
                    Icons.account_balance,
                    Colors.orange,
                    () {},
                  ),
                  _buildActionTile(
                    context,
                    'View Reports',
                    Icons.analytics,
                    Colors.purple,
                    () {},
                  ),
                  _buildActionTile(
                    context,
                    'System Settings',
                    Icons.settings,
                    Colors.grey,
                    () {},
                  ),
                ],
              ),
            ),
            
            const Divider(),
            
            // Recent Activity
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Recent Activity',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  _buildActivityItem(
                    'New user registration',
                    'user@example.com',
                    '5 minutes ago',
                    Icons.person_add,
                    Colors.blue,
                  ),
                  _buildActivityItem(
                    'Application submitted',
                    'PM Scholarship Scheme',
                    '15 minutes ago',
                    Icons.description,
                    Colors.green,
                  ),
                  _buildActivityItem(
                    'Application approved',
                    'Ayushman Bharat',
                    '1 hour ago',
                    Icons.check_circle,
                    Colors.green,
                  ),
                  _buildActivityItem(
                    'New scheme added',
                    'Digital India Initiative',
                    '2 hours ago',
                    Icons.add_circle,
                    Colors.orange,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(
    BuildContext context,
    String value,
    String label,
    IconData icon,
    Color color,
  ) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 32, color: color),
            const SizedBox(height: 8),
            Text(
              value,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionTile(
    BuildContext context,
    String title,
    IconData icon,
    Color color,
    VoidCallback onTap,
  ) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: color),
        ),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        trailing: const Icon(Icons.arrow_forward_ios, size: 16),
        onTap: onTap,
      ),
    );
  }

  Widget _buildActivityItem(
    String title,
    String subtitle,
    String time,
    IconData icon,
    Color color,
  ) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 1,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Text(subtitle),
        trailing: Text(
          time,
          style: const TextStyle(fontSize: 12, color: Colors.grey),
        ),
      ),
    );
  }
}
