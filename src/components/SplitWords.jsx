import { Fragment } from 'react';

/**
 * Splits a sentence into word wrappers so each word can be revealed
 * independently. Spaces are kept as real text nodes for screen readers.
 */
export default function SplitWords({ text, className = '' }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? ' ' : null}
          <span className="sw">
            <span className="sw-inner">{word}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
