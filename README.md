# Project Details

**Project name:** Server (Sprint 3)

**Team members:** cbutulis and mzheng37

**Contributions:**

cbutulis: load and view functionality, readme

mzheng37: search functionality and html tables, documentation

shared tasks: testing, organization, creating mocked-data

**Total estimated time:** 15 hours

**Project Description:** This is a project for CS32 at Brown. Here, a sample front-end allows functions such as loading in files, viewing, searching for value in the file, and changing mode between verbose and brief.
It also allows developers to input their own commands with customed functions and delete any commands. All functions are tested with mocked data and search results, which mimics after a backend server that manages loading, parsing, and searching CSV files.

**GitHub Link:** [click here](https://github.com/cs0320-s24/mock-chrisbutulis-yuuu23.git)

# Design Choices

**Design Choices:**

-calling addCommand() in App.tsx, which allows the stakeholder (i.e. developers) to choose which commands to add,
and even add their own, or deleteCommand() which allows deletion of commands and its associated custom function.

-Returning a defensive copy of the command map in REPL, so it can't be inappropriately modified
after the initial preferences are set.

-Using an Array of histEntry types to keep track of data in either a string array type as
well as 2-D string array. It also keeps track of if the mode is brief, and the command
associated with a given output. This maximized extensibility/flexibility for any developers developing their own commands and custom functions and provided for more organized
code.

- For example, a developer may have a function in which the background color changes depend on if it's brief or verbose.

-Adding support for the user to press the return key rather than clicking submit for ease
of use and accessibility.

**Explain the relationships between classes/interfaces:**

-The App function is the top-level function, where a LoginButton and REPL are created.
REPLCmdMap's addCommand function is referenced here to add command functionality.

- Each functions associated with each command is inside REPLFunction, where all functions implement the REPLFunction interface, requiring each function to return string or 2D array of string as output to be easily transformed into JSX elements for display

-The LoginButton simply serves to act as a button which update sthe shared state
isLoggedIn() which allows the REPL to become visible when it is clicked

-The REPL function tracks the history with an array of histEntry and creates a REPLHistory
and REPLInput

-REPLHistory displays the history through paragraph or table elements. First, the function
type checks if the history is a string. If it is, we make a paragraph, otherwise we know
it is a string[][] and convert it to a table using two subsequent map() calls and a
lambda

-REPLInput is responsible for dealing with user input. As such it creates a Field for
input, a Button which calls the handleSubmit function when clicked, and a ControlledInput
which helps handle user input. Much of the logic of the program is handled through
handleSubmit(), which contains the logic which calls the appropriate REPLFunction
for the following built in functions:

-load_file [filepath] : loads a file

-view : views the loaded file

-search [header label/col number] [value] : searches the loaded file for the value under the header lable or column number

-mode : toggles between verbose and brief (default) output modes

Built in files (use exact file name as filepath):

    -stars

    -starsOne

    -starsCol

    -empty

**Discuss any specific data structures you used:**

-The primary data structures are an array which stores type histEntry, a custom type which
stores history data, and any string[] or string[][] this datatype contains.

**Runtime/space optimizations you made:** N/A

# Errors/Bugs

None discovered, and no substantial checkstyle errors.

# Tests

The test suite is comprised of five main components: general Application testing, Command entry
testing, Interactions testing, Mode testing (brief/verbose), and Unit testing. The components
perform the following functionality tests:

-Application testing: Here there are tests to ensure the login button and header appear, that
input box and history don't appear before logging in, that typing into input changes its contents,
that clicking submit clears input, and that clicking login makes the submit button appear.

-Command entry testing: Here there are tests to ensure that an appropriate error arises if an
unknown command is entered, that alternating between existing and non-existing commands produces
expected output, that empty commands produce an error, that each command (load, view, and search) work
under normal operation, that searching with no results produces a no results message, and that
searching an empty file produces a no results message.

-Interactions testing: Here there are tests to ensure that loading and viewing work with
repeated loads, that loading in files that don't exist and then files that exist along with changing
mode works, that viewing without loading produces an error message, that searching without
loading produces an error message, that loading a file, signing out, and then viewing doesn't remove
the file. Tests are also scattered throughout which test that mode displays appropriate command
history.

-Mode testing: Here there are tests to ensure that changing mode from brief to verbose
works, and that mode changing betweeen brief and verbose and back to brief many times works,

-Unit testing: Here there are individual function tests on REPLFunction and cmdMap functions to ensure that adding and deleting
from the command map work, that changing mode produces the correct output/errors when given
varying arguments, that loading produces the correct errors with varying arguments, that search
produces errors when given the incorrect amount of arguments, and a few basic interactions between
load and view calls.

# How to

Website: navigate to the mock directory and run `npm start`

Tests: navigate to the mock directory and run `npm run test` (run `npm run test:e2e` for frontend e2e tests and `npm run test:unit` for unit function tests)

# Collaboration

No outside collaboration.
