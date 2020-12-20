# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased](https://github.com/benzinho75/node-messenger/compare/v1.1.0...HEAD)

### To fix

- Rendering problems on channels with too many messages (part of header disappear, title is not shown when scrolling down, form is not shown when scrollling up)
- First time logging with Dex is sometimes not working
- No error message when trying to load an invalid channel ID
- Should load new channel after refresh when created a new channel

## [1.1.0](https://github.com/benzinho75/node-messenger/compare/v1.0.0...v1.1.0) - 2020-12-20

### Added

- Customized login screen and worked and looks
- Create channel button + dialog (works with enter key)
- Adding known users to a channel when creating it
- Inviting new users via email
- Link to /channels on title
- Show members button inside channel and tell which one is the owner
- Adding a member inside a channel (had to configure CORS preflight requests handling server side for PUT requests)
- Each API request require the user to be logged in
- User can only see / post to / invite to channels for which he is the owner or one of the members
- Appropriate HTTP response codes and messages for each case
- Settings Dialog
- Setting up a gravatar
- Random username generated from https://randomuser.me/ API when logging for the first time
- Updating username in settings
- Choosing language between every available locales with autocomplete
- Dark Theme switch (light theme not implemented)
- Settings updates are persisted in DB
- Message modification (modify dialog, messages put route, update in DB)
- Message deletion (delete dialog, messages delete route, update in DB)
- Avatar selection from a list of provided ones

### Fixed

- When inviting new users with email at channel creation:
    - former email still visible when inviting a second user
    - invited users don't show among selected / unselected ones
- User creating a channel (future owner) is not shown among users to invite when creating channel
- Unable to reload page when on a channel
- Messages always posted as david no matter who posted them
- Enter key in message form does not send but put new line
- Messages date is always the one of the last message

## [1.0.0](https://github.com/benzinho75/node-messenger/compare/v0.0.6...v1.0.0) - 2020-12-07

### Changed

- Rebased project structure from https://github.com/adaltas/ece-2020-fall-webtech-project

## [0.0.6](https://github.com/benzinho75/node-messenger/compare/v0.0.5...v0.0.6) - 2020-11-25

### Added

- OpenID Connect w/ Dex


## [0.0.5](https://github.com/benzinho75/node-messenger/compare/v0.0.4...v0.0.5) - 2020-11-18

### Added

- Sign in page
- Responsive drawer

### Changed

- Rebased project on lab 5 starting structure


## [0.0.4](https://github.com/benzinho75/node-messenger/compare/v0.0.3...v0.0.4) - 2020-11-10

### Added
- Lab 4: other messenger example using DOM modification instead of state modification for input field reset + CSS-in-JS w/ Emotion
- Lab 4: declarative routing with React Router
- Refactored project structure
- Refactored front-end in smaller components

## [0.0.3](https://github.com/benzinho75/node-messenger/compare/v0.0.2...v0.0.3) - 2020-10-14

### Added
- Lab 3 finished (all tests passing)
- Lab 4: Intro tutorial to React
- Lab 4: simple messenger using functional component and hooks

### Changed
- Reorganized repo


## [0.0.2](https://github.com/benzinho75/node-messenger/compare/v0.0.1...v0.0.2) - 2020-10-07

### Added
- CHANGELOG.md links
- Lab 3 (WIP: 7 out of 9 tests passed)

### Fixed
- README.md


## [0.0.1](https://github.com/benzinho75/node-messenger/releases/tag/v0.0.1) - 2020-10-07

### Changed
- Reorganized project structure.
