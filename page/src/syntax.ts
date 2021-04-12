const tokenStyles = css`
  &.comment {
    color: #a0a1a7;
    font-style: italic;
  }

  &.attribute,
  &.atom {
    color: #d19a66;
  }

  &.keyword {
    color: #a626a4;
  }

  &.builtin {
    color: #e45649;
  }

  &.qualifier {
    color: #986801;
  }

  &.punctuation,
  &.meta {
    color: #383a42;
  }

  &.property,
  &.def {
    color: #4078f2;
  }

  *:not(:focus) > &.invalidchar,
  *:not(:focus) > &.error {
    text-decoration-thickness: 1px;
    text-decoration-line: underline;
    text-decoration-style: wavy;
    text-decoration-color: red;
  }

  &.error {
    cursor: pointer;
  }
`;


