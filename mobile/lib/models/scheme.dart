import 'package:json_annotation/json_annotation.dart';

part 'scheme.g.dart';

@JsonSerializable()
class Scheme {
  final String id;
  final String name;
  final String description;
  final String category;
  final String eligibility;
  final String benefits;
  final String documents;
  @JsonKey(name: 'official_url')
  final String officialUrl;
  final String state;
  final String language;
  @JsonKey(name: 'created_at')
  final DateTime? createdAt;

  Scheme({
    required this.id,
    required this.name,
    required this.description,
    required this.category,
    required this.eligibility,
    required this.benefits,
    required this.documents,
    required this.officialUrl,
    required this.state,
    required this.language,
    this.createdAt,
  });

  factory Scheme.fromJson(Map<String, dynamic> json) => _$SchemeFromJson(json);
  Map<String, dynamic> toJson() => _$SchemeToJson(this);

  Scheme copyWith({
    String? id,
    String? name,
    String? description,
    String? category,
    String? eligibility,
    String? benefits,
    String? documents,
    String? officialUrl,
    String? state,
    String? language,
    DateTime? createdAt,
  }) {
    return Scheme(
      id: id ?? this.id,
      name: name ?? this.name,
      description: description ?? this.description,
      category: category ?? this.category,
      eligibility: eligibility ?? this.eligibility,
      benefits: benefits ?? this.benefits,
      documents: documents ?? this.documents,
      officialUrl: officialUrl ?? this.officialUrl,
      state: state ?? this.state,
      language: language ?? this.language,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
