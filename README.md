# Project Details

Project name: Server (Sprint 3)

Team members: cbutulis and mzheng37

Contributions:

cbutulis: load and view functionality

mzheng37: search functionality and html tables

shared tasks: testing

Total estimated time: 15 hours

GitHub Link: [click here](https://github.com/cs0320-s24/mock-chrisbutulis-yuuu23.git)

# Design Choices

Design Choices:

-calling addCommand() in App.tsx, which allows the stakeholder to choose which commands to add,
and even add their own.

-Returning a defensive copy of the command map in REPL, so it can't be inappropriately modified
after the initial preferences are set.

-Using an Array of histEntry types to keep track of data in either a string array type as
well as 2-D string array. It also keeps track of if the mode is brief, and the command
associated with a given output. This maximized extensibility and provided for more organized
code.

-Adding support for the user to press the return key rather than clicking submit for ease
of use and accessibility.

Explain the relationships between classes/interfaces:

-The App function is the top-level function, where a LoginButton and REPL are created.
REPLCmdMap's addCommand function is referenced here to add command functionality.

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

-search [header label/col number] : searches the loaded file

-mode : toggles between verbose and regular output modes

Built in files (use exact file name as filepath):

    -stars

    -starsOne

    -empty

Discuss any specific data structures you used, why you created it, and other high level
explanations:

-The primary data structures are an array which stores type histEntry, a custom type which
stores history data, and any string[] or string[][] this datatype contains.

Runtime/space optimizations you made: N/A

# Errors/Bugs

None discovered, and no substantial checkstyle errors.

# Tests

# How to

Website: navigate to the mock directory and run `npm start`
Tests: navigate to the mock directory and run `npx playwright test`

# Collaboration

None.
