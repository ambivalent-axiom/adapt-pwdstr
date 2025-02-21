import React, { useState } from 'react';

export default function PwdStr(props) {
  const {
    description,
    _pwdstr,
    _maxScore,
    inputLabel,
    completeText,
    _textTooLong,
    onChallangeComplete
  } = props;

  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  const getFailedAspects = (aspects, password) => {
    if (!password || !aspects?.length) return aspects;

    return aspects.filter(aspect => {
      // Check length criteria
      if (aspect.length && password.length >= aspect.length) {
        return false;
      }

      // Check regex criteria
      if (aspect.regex) {
        try {
          const pattern = new RegExp(aspect.regex);
          return !pattern.test(password);
        } catch (error) {
          console.warn('Invalid regex pattern:', aspect.regex);
          return false;
        }
      }

      return true;
    });
  };

  const getRandomSuggestion = (password) => {
    const failedAspects = getFailedAspects(_pwdstr.aspects, password);
    if (failedAspects.length === 0) {
      return completeText;
    }
    const randomIndex = Math.floor(Math.random() * failedAspects.length);
    return failedAspects[randomIndex].suggestion;
  };

  const runTest = (aspects, password) => {
    if (!password || !aspects?.length) return 0;

    return aspects.reduce((totalScore, aspect) => {
      // Check length criteria
      if (aspect.length && password.length >= aspect.length) {
        return totalScore + parseInt(aspect.score, 10);
      }

      // Check regex criteria
      if (aspect.regex) {
        try {
          const pattern = new RegExp(aspect.regex);
          if (pattern.test(password)) {
            return totalScore + parseInt(aspect.score, 10);
          }
        } catch (error) {
          console.warn('Invalid regex pattern:', aspect.regex);
        }
      }

      return totalScore;
    }, 0);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length > 16) return;
    setPassword(newPassword);

    // Run test immediately when password changes
    const currentScore = runTest(_pwdstr.aspects, newPassword);
    setScore(currentScore);

    // Update suggestion
    if (newPassword.length > 16) {
      setSuggestion(_textTooLong);
    } else {
      setSuggestion(getRandomSuggestion(newPassword));
    };

    // Check if password meets requirements
    if (currentScore >= _maxScore) {
      onChallangeComplete?.(true);
    }
  };

  return (
    <div className="pwdstr__container">
      <div className="pwdstr__description">
        <p>{description}</p>
      </div>
      <div className="pwdstr__input--block">
        <div className="pwdstr__input">
          <input
            className="pwdstr__input--field"
            type="password"
            id="password"
            placeholder={inputLabel}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <div className="pwdstr__show">
        <p>{password}</p>
      </div>
      {suggestion && (
        <div className="pwdstr__suggestion">
          <p>{suggestion}</p>
        </div>
      )}
      {score >= 0 && (
        <div className="pwdstr__progress">
          <div className="pwdstr__progress-bar">
            <div
              className={`pwdstr__progress-fill ${
                (score / _maxScore) * 100 <= 20
                  ? 'weak' :
                  (score / _maxScore) * 100 <= 80 ? 'medium' : 'strong'
              }`}
              style={{
                width: `${(score / _maxScore) * 100}%`
              }}
            />
          </div>
          <div className="pwdstr__progress-text">
            {Math.round((score / _maxScore) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}
