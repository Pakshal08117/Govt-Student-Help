# 🤝 Contributing to Government & Student Help Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Contribution Areas](#contribution-areas)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Be respectful and considerate
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Any conduct that could be considered inappropriate

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/govt-student-help-platform.git
cd govt-student-help-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Development Workflow

### 1. Create a Branch
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or a bugfix branch
git checkout -b fix/bug-description
```

### 2. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run the development server
npm run dev

# Test in multiple browsers
# Test in different languages
# Test responsive design
```

### 4. Commit Your Changes
```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature description"
```

### 5. Push and Create PR
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## Contribution Areas

### 🌐 Translations (Beginner Friendly)
Help translate the platform into more Indian languages or improve existing translations.

**Files to edit:**
- `src/contexts/LanguageTranslations.ts`
- `src/contexts/AllLanguageTranslations.ts`

**Guidelines:**
- Maintain formal, respectful tone
- Use government-appropriate language
- Test translations in the UI

### 📊 Data Updates (Beginner Friendly)
Update government scheme information, add new schemes, or correct existing data.

**Files to edit:**
- `src/data/schemes.ts`
- `src/data/services.ts`
- `src/data/locations.ts`

**Guidelines:**
- Verify information from official sources
- Include source URLs in comments
- Update last modified date

### 🎨 UI/UX Improvements (Intermediate)
Enhance the user interface and experience.

**Areas:**
- Component design
- Responsive layouts
- Accessibility improvements
- Animation and transitions

**Guidelines:**
- Follow Indian Government design standards
- Maintain accessibility (WCAG 2.1 AA)
- Test on multiple devices
- Keep mobile-first approach

### 🤖 AI Enhancement (Advanced)
Improve the AI chatbot intelligence and responses.

**Files to edit:**
- `src/services/aiService.ts`
- `src/services/explainableAI.ts`
- `src/services/governmentAssistant.ts`

**Guidelines:**
- Test with various user queries
- Ensure multi-language support
- Maintain response accuracy
- Document AI logic

### 🔧 Backend Development (Advanced)
Improve database structure, API integration, and backend logic.

**Areas:**
- Supabase schema improvements
- API integrations
- Performance optimization
- Security enhancements

**Guidelines:**
- Follow security best practices
- Document database changes
- Test thoroughly
- Consider scalability

## Coding Standards

### TypeScript
```typescript
// Use TypeScript for type safety
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Use proper typing
const getUser = (id: string): Promise<UserProfile> => {
  // Implementation
};
```

### React Components
```typescript
// Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  );
};
```

### File Naming
- Components: `PascalCase.tsx` (e.g., `UserDashboard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use meaningful variable names
- Add comments for complex logic

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add social login support

fix(dashboard): resolve application status display issue

docs(readme): update installation instructions

style(header): improve navigation spacing

refactor(api): optimize data fetching logic
```

## Pull Request Process

### Before Submitting
- ✅ Code follows project style guidelines
- ✅ All tests pass
- ✅ Documentation is updated
- ✅ Commits are clean and descriptive
- ✅ Branch is up to date with main

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process
1. Automated checks run
2. Code review by maintainers
3. Requested changes (if any)
4. Approval and merge

## Questions?

- 💬 Open a [GitHub Discussion](https://github.com/yourusername/govt-student-help-platform/discussions)
- 🐛 Report bugs via [GitHub Issues](https://github.com/yourusername/govt-student-help-platform/issues)
- 📧 Email: support@govhelp.in

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in documentation

Thank you for contributing! 🙏
