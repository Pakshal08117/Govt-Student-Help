import 'package:json_annotation/json_annotation.dart';

part 'application.g.dart';

enum ApplicationStatus {
  pending,
  @JsonValue('under_review')
  underReview,
  approved,
  rejected,
}

@JsonSerializable()
class Application {
  final String id;
  @JsonKey(name: 'user_id')
  final String userId;
  @JsonKey(name: 'scheme_id')
  final String schemeId;
  final ApplicationStatus status;
  @JsonKey(name: 'applied_date')
  final DateTime appliedDate;
  @JsonKey(name: 'reviewed_date')
  final DateTime? reviewedDate;
  final String? notes;
  @JsonKey(name: 'created_at')
  final DateTime? createdAt;
  @JsonKey(name: 'updated_at')
  final DateTime? updatedAt;

  // Populated fields
  @JsonKey(name: 'scheme_name')
  final String? schemeName;
  @JsonKey(name: 'scheme_category')
  final String? schemeCategory;

  Application({
    required this.id,
    required this.userId,
    required this.schemeId,
    required this.status,
    required this.appliedDate,
    this.reviewedDate,
    this.notes,
    this.createdAt,
    this.updatedAt,
    this.schemeName,
    this.schemeCategory,
  });

  factory Application.fromJson(Map<String, dynamic> json) =>
      _$ApplicationFromJson(json);
  Map<String, dynamic> toJson() => _$ApplicationToJson(this);

  Application copyWith({
    String? id,
    String? userId,
    String? schemeId,
    ApplicationStatus? status,
    DateTime? appliedDate,
    DateTime? reviewedDate,
    String? notes,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? schemeName,
    String? schemeCategory,
  }) {
    return Application(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      schemeId: schemeId ?? this.schemeId,
      status: status ?? this.status,
      appliedDate: appliedDate ?? this.appliedDate,
      reviewedDate: reviewedDate ?? this.reviewedDate,
      notes: notes ?? this.notes,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      schemeName: schemeName ?? this.schemeName,
      schemeCategory: schemeCategory ?? this.schemeCategory,
    );
  }

  String get statusText {
    switch (status) {
      case ApplicationStatus.pending:
        return 'Pending';
      case ApplicationStatus.underReview:
        return 'Under Review';
      case ApplicationStatus.approved:
        return 'Approved';
      case ApplicationStatus.rejected:
        return 'Rejected';
    }
  }
}
