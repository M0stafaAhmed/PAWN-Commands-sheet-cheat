# Contributing to PwnRef

Corrections and additions should improve accuracy, clarity, and safe use—not simply increase the command count.

## Command entry requirements

For each new or corrected command, include:

- The tool and, when relevant, the tested version.
- The purpose and expected output or effect.
- Required privileges, dependencies, and environment assumptions.
- A clear explanation of placeholders such as `TARGET`, `LHOST`, and `WORDLIST`.
- Relevant limitations, operational risks, or potential service impact.
- An authoritative upstream documentation or manual-page reference where available.

## Safety and privacy

- Only submit examples intended for authorized security testing and administration.
- Never include real credentials, tokens, private keys, client data, or personally identifying information.
- Use documentation-only example domains and reserved IP ranges wherever possible.
- Clearly label commands that can modify systems, affect availability, capture credentials, or alter security controls.

## Quality checks

Before submitting a change:

1. Confirm the command syntax against the relevant tool version.
2. Confirm the displayed command and copied command are consistent.
3. Check that descriptions explain important flags and prerequisites.
4. Check desktop and mobile layout.
5. Check that search and favorites still work.
