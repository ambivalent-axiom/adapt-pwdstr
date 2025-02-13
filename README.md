# Password Strength Component

A configurable Adapt component that helps learners create strong passwords by providing real-time feedback on password strength and specific improvement suggestions.

## Features

- Real-time password strength evaluation
- Configurable validation rules
- Custom scoring system
- Detailed feedback and suggestions
- Multiple validation aspects (length, character types, patterns)
- Accessibility support with ARIA labels

## Installation

1. Download the zip file from the repository
2. Extract the zip file into the `src/components` folder in your Adapt framework
3. From your framework directory, run:

```bash
npm install
```

The component will be available for use in your Adapt courses.

## Usage

Add the component to your course using the Adapt Authoring Tool or by adding it to your JSON:

```json
{
    "_id": "password-strength-1",
    "_component": "pwdstr",
    "_layout": "full-width",
    "title": "Password Strength Checker",
    "_pwdstr": {
        "aspects": [...]
    }
}
```

## Configuration

The component can be configured using the following attributes:

### Required Attributes

- `_component` (string): Must be set to `"pwdstr"`
- `_layout` (string): Component layout, either `"full-width"`, `"half-width"`, or `"both"`

### Optional Attributes

- `title` (string): The title text that appears above the component
- `displayTitle` (string): Alternative title text for displaying
- `description` (string): Introductory or explanatory text
- `_pwdstr` (object): Configuration for password strength validation

### Password Strength Configuration

The `_pwdstr.aspects` array allows you to define multiple validation criteria:

```json
"aspects": [
    {
        "length": 8,                    // Minimum length requirement
        "suggestion": "Use at least 8 characters",
        "score": 1                      // Points awarded for meeting this criterion
    },
    {
        "regex": "[A-Z]",              // Regular expression pattern
        "suggestion": "Add capital letters",
        "score": 2
    }
]
```

Each aspect can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `length` | Integer | Minimum character length requirement |
| `regex` | String | Regular expression pattern to match |
| `suggestion` | String | Helpful message shown when criterion is not met |
| `score` | Integer | Points awarded when criterion is met |

## Validation Types

1. **Length Validation**
   - Checks minimum password length
   - Configure using the `length` property

2. **Pattern Validation**
   - Uses regular expressions to check for specific character types
   - Configure using the `regex` property
   - Common patterns include:
     - Uppercase letters: `[A-Z]`
     - Lowercase letters: `[a-z]`
     - Numbers: `[0-9]`
     - Special characters: `[^A-Za-z0-9]`

## Accessibility

The component includes ARIA labels and roles for screen readers. The default ARIA region can be customized through the `ariaRegion` property in the course config.

## Browser Support

This component has been tested with the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- Adapt Framework (>=5.0.0)

## Limitations

- Regular expressions must be valid JavaScript regex patterns
- Scores must be positive integers
- Maximum supported password length is 100 characters

## Contributing

Found a bug? Want to contribute? Feel free to submit a pull request or create an issue on GitHub.

## License

Licensed under the [MIT License](LICENSE).

## Support

If you find a bug or have a feature request, please create an issue on the GitHub repository.