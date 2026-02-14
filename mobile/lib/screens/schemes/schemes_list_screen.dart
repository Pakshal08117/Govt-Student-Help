import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/scheme_provider.dart';
import '../../providers/language_provider.dart';
import '../../config/routes.dart';

class SchemesListScreen extends StatefulWidget {
  final String? category;
  
  const SchemesListScreen({super.key, this.category});

  @override
  State<SchemesListScreen> createState() => _SchemesListScreenState();
}

class _SchemesListScreenState extends State<SchemesListScreen> {
  final TextEditingController _searchController = TextEditingController();
  String? _selectedCategory;
  String? _selectedState;

  @override
  void initState() {
    super.initState();
    _selectedCategory = widget.category;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<SchemeProvider>().loadSchemes();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final languageProvider = context.watch<LanguageProvider>();
    final schemeProvider = context.watch<SchemeProvider>();
    
    // Filter schemes
    var filteredSchemes = schemeProvider.schemes;
    
    if (_searchController.text.isNotEmpty) {
      filteredSchemes = filteredSchemes.where((scheme) {
        final query = _searchController.text.toLowerCase();
        return (scheme.name?.toLowerCase().contains(query) ?? false) ||
               (scheme.description?.toLowerCase().contains(query) ?? false);
      }).toList();
    }
    
    if (_selectedCategory != null) {
      filteredSchemes = filteredSchemes.where((scheme) {
        return scheme.category?.toLowerCase() == _selectedCategory?.toLowerCase();
      }).toList();
    }
    
    if (_selectedState != null) {
      filteredSchemes = filteredSchemes.where((scheme) {
        return scheme.state?.toLowerCase() == _selectedState?.toLowerCase();
      }).toList();
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(languageProvider.translate('schemes')),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () => _showFilterDialog(context),
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: languageProvider.translate('search_schemes'),
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isNotEmpty
                    ? IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          setState(() {
                            _searchController.clear();
                          });
                        },
                      )
                    : null,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: Colors.grey[100],
              ),
              onChanged: (value) => setState(() {}),
            ),
          ),
          
          // Active Filters
          if (_selectedCategory != null || _selectedState != null)
            Container(
              height: 50,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  if (_selectedCategory != null)
                    Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: Chip(
                        label: Text(_selectedCategory!),
                        onDeleted: () {
                          setState(() => _selectedCategory = null);
                        },
                      ),
                    ),
                  if (_selectedState != null)
                    Chip(
                      label: Text(_selectedState!),
                      onDeleted: () {
                        setState(() => _selectedState = null);
                      },
                    ),
                ],
              ),
            ),
          
          // Schemes List
          Expanded(
            child: schemeProvider.isLoading
                ? const Center(child: CircularProgressIndicator())
                : filteredSchemes.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.search_off,
                              size: 64,
                              color: Colors.grey[400],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              languageProvider.translate('no_schemes_found'),
                              style: TextStyle(
                                fontSize: 16,
                                color: Colors.grey[600],
                              ),
                            ),
                          ],
                        ),
                      )
                    : RefreshIndicator(
                        onRefresh: () => schemeProvider.loadSchemes(),
                        child: ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: filteredSchemes.length,
                          itemBuilder: (context, index) {
                            final scheme = filteredSchemes[index];
                            return _buildSchemeCard(context, scheme);
                          },
                        ),
                      ),
          ),
        ],
      ),
    );
  }

  Widget _buildSchemeCard(BuildContext context, dynamic scheme) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: InkWell(
        onTap: () {
          Navigator.of(context).pushNamed(
            AppRoutes.schemeDetail,
            arguments: scheme.id,
          );
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  if (scheme.category != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Theme.of(context).primaryColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        scheme.category!,
                        style: TextStyle(
                          fontSize: 12,
                          color: Theme.of(context).primaryColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  const Spacer(),
                  if (scheme.state != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.location_on, size: 12),
                          const SizedBox(width: 4),
                          Text(
                            scheme.state!,
                            style: const TextStyle(fontSize: 12),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                scheme.name ?? 'Scheme',
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                scheme.description ?? '',
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[600],
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Icon(
                    Icons.check_circle_outline,
                    size: 16,
                    color: Colors.green[700],
                  ),
                  const SizedBox(width: 4),
                  Text(
                    'Eligible',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.green[700],
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const Spacer(),
                  const Icon(Icons.arrow_forward_ios, size: 16),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showFilterDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Container(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Filter Schemes',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 24),
              
              // Category Filter
              Text(
                'Category',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: [
                  'Education',
                  'Healthcare',
                  'Agriculture',
                  'Housing',
                  'Employment',
                  'Social Security',
                ].map((category) {
                  return FilterChip(
                    label: Text(category),
                    selected: _selectedCategory == category.toLowerCase(),
                    onSelected: (selected) {
                      setModalState(() {
                        setState(() {
                          _selectedCategory = selected ? category.toLowerCase() : null;
                        });
                      });
                    },
                  );
                }).toList(),
              ),
              
              const SizedBox(height: 24),
              
              // State Filter
              Text(
                'State',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: [
                  'All India',
                  'Maharashtra',
                  'Karnataka',
                  'Tamil Nadu',
                  'Gujarat',
                ].map((state) {
                  return FilterChip(
                    label: Text(state),
                    selected: _selectedState == state,
                    onSelected: (selected) {
                      setModalState(() {
                        setState(() {
                          _selectedState = selected ? state : null;
                        });
                      });
                    },
                  );
                }).toList(),
              ),
              
              const SizedBox(height: 24),
              
              // Action Buttons
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () {
                        setState(() {
                          _selectedCategory = null;
                          _selectedState = null;
                        });
                        Navigator.pop(context);
                      },
                      child: const Text('Clear All'),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      child: const Text('Apply'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
