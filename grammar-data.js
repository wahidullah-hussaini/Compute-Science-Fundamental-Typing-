/* =============================================================================
 * grammar-data.js
 * -----------------------------------------------------------------------------
 * The Computer Science Fundamentals curriculum behind TypeCS.
 *
 * Structure: GRAMMAR_LEVELS is an array of levels, each holding lessons with
 *   id, title, tagline, definition, rules[], examples[{text,note}], drill
 *
 * Curriculum: 5 levels x 6 lessons = 30 lessons.
 *   01 Computer Science Basics
 *   02 Data and Algorithms
 *   03 Programming Concepts
 *   04 Systems, Networks and Security
 *   05 Emerging Technologies
 *
 * Every `drill` and `examples[].text` string is deliberately restricted to
 * plain ASCII so that it can always be typed on a standard physical keyboard.
 * Smart quotes, en/em dashes and other typographic characters are used only
 * inside prose fields (definition / rules / notes), never inside typed text.
 * ========================================================================== */

const GRAMMAR_LEVELS = [
  /* ======================================================================= *
   * LEVEL 1 - COMPUTER SCIENCE BASICS                                        *
   * ======================================================================= */
  {
    id: 'cs-basics',
    name: 'Computer Science Basics',
    subtitle: 'The foundations of computing',
    difficulty: 'Easy',
    icon: '01',
    lessons: [
      {
        id: 'what-is-computer-science',
        title: 'What Is Computer Science?',
        tagline: 'The study of computation, information and algorithms',
        definition:
          'Computer science is the study of computation, algorithms, information, software, hardware and the systems used to process and communicate data.',
        rules: [
          'Computer science is about problem solving, not only about using computers.',
          'Computers process information using instructions written by people.',
          'Data is represented using binary values.',
          'An algorithm describes a clear sequence of steps for solving a problem.',
          'Good solutions are correct, efficient and easy to understand.',
        ],
        examples: [
          { text: 'An algorithm is a sequence of steps used to solve a problem.', note: 'Algorithms provide instructions for solving computational problems.' },
          { text: 'A CPU executes instructions stored in computer memory.', note: 'The processor performs the instructions of a program.' },
          { text: 'Data structures organize information so programs can use it efficiently.', note: 'Arrays, stacks, queues and trees are examples of data structures.' },
        ],
        drill:
          'Computer science studies computation, algorithms, data, software and computer systems. An algorithm describes a sequence of steps for solving a problem. Programs use data structures and instructions to process information efficiently.',
      },
      {
        id: 'computers-and-information',
        title: 'Computers and Information',
        tagline: 'Data, information, and how computers use both',
        definition:
          'A computer is an electronic machine that receives data, processes it according to instructions, stores it and produces results. Raw data becomes useful information after processing.',
        rules: [
          'The basic cycle is input, processing, output and storage.',
          'Data is raw facts; information is data that has been processed.',
          'Every piece of data must be stored somewhere in order to be kept.',
          'Computers work with digital data represented as binary values.',
        ],
        examples: [
          { text: 'A keyboard provides input to a computer.', note: 'Input is any data sent to the machine.' },
          { text: 'A report displayed on the screen is output.', note: 'Output is information produced after processing.' },
          { text: 'The computer stores the file so it can be opened later.', note: 'Storage keeps data over time.' },
        ],
        drill:
          'A computer receives data, processes it and produces information. Data is raw facts, while information is data that has been processed. Input, processing, output and storage describe the basic cycle of a computer.',
      },
      {
        id: 'hardware-and-software',
        title: 'Hardware and Software',
        tagline: 'The physical machine and the programs that drive it',
        definition:
          'Hardware is the physical part of a computer that you can touch. Software is the programs and data that tell the hardware what to do. Neither can be useful without the other.',
        rules: [
          'Hardware includes the processor, memory, storage and peripherals.',
          'Software includes the operating system and applications.',
          'The operating system manages hardware on behalf of programs.',
          'Hardware and software must be designed to work together.',
        ],
        examples: [
          { text: 'A CPU is a piece of hardware.', note: 'It executes the instructions of programs.' },
          { text: 'A web browser is software.', note: 'It gives people a way to use the machine.' },
          { text: 'The operating system sits between hardware and applications.', note: 'It shares resources fairly.' },
        ],
        drill:
          'Hardware refers to the physical parts of a computer. Software refers to the programs that control the hardware. An operating system manages hardware resources for other programs.',
      },
      {
        id: 'input-processing-output',
        title: 'Input, Processing and Output',
        tagline: 'The life cycle of data inside a computer',
        definition:
          'Every task a computer performs can be described as input, processing and output. Data enters the system, the processor transforms it, and the result is presented or stored.',
        rules: [
          'Input devices such as keyboards and mice send data to the computer.',
          'The CPU performs arithmetic and logical operations on data.',
          'Output devices such as monitors and printers present results.',
          'Storage keeps results available for later use.',
        ],
        examples: [
          { text: 'You type a letter and it appears on the screen.', note: 'Input becomes output after processing.' },
          { text: 'A calculator adds two numbers together.', note: 'Processing transforms input into a result.' },
          { text: 'A printer produces a paper copy of the document.', note: 'Output leaves the system.' },
        ],
        drill:
          'Input is data sent to a computer. Processing transforms that data into useful information. Output presents the result to the user, and storage keeps the result for later use.',
      },
      {
        id: 'binary-numbers',
        title: 'Binary Numbers',
        tagline: 'Counting with only two digits',
        definition:
          'Binary is a number system built from the digits zero and one. Computers store every value as a sequence of binary digits because electronic circuits can hold two stable states.',
        rules: [
          'A single binary digit is called a bit.',
          'The value of a bit depends on its position in the sequence.',
          'Eight bits together make one byte.',
          'The binary value 1010 equals ten in decimal notation.',
          'Powers of two grow quickly: 2, 4, 8, 16, 32, 64.',
        ],
        examples: [
          { text: 'The binary number 1101 equals thirteen in decimal.', note: 'Add the column values 8, 4, 0 and 1.' },
          { text: 'One byte can hold values from 0 to 255.', note: 'Two raised to the power eight is 256.' },
          { text: 'Screen colours are stored as small binary numbers.', note: 'Each colour channel usually uses eight bits.' },
        ],
        drill:
          'Binary uses only the digits zero and one. Each position in a binary number stands for a power of two. Eight bits form one byte, which can hold values from zero up to two hundred and fifty five.',
      },
      {
        id: 'data-representation',
        title: 'Data Representation',
        tagline: 'Text, images and sound stored as numbers',
        definition:
          'Computers turn text, images, sound and video into numbers so they can be stored and processed. The same binary values are read in different ways depending on the file format.',
        rules: [
          'Characters are stored using a character encoding such as ASCII or Unicode.',
          'ASCII assigns a number to each letter and symbol.',
          'An image is a grid of pixels, and each pixel holds a colour value.',
          'Sound is sampled many times per second and stored as numbers.',
          'A file format tells software how to read the stored values back.',
        ],
        examples: [
          { text: 'The letter A is stored as the number sixty five in ASCII.', note: 'ASCII was one of the first widely used character codes.' },
          { text: 'A pixel stores red, green and blue values.', note: 'Mixing these channels produces the displayed colour.' },
          { text: 'A music file holds a long sequence of audio samples.', note: 'More samples per second give higher quality.' },
        ],
        drill:
          'Text, images and sound are all stored as numbers. Character encoding maps letters to numbers, pixels store colours, and audio samples record volume over time. The file format explains how to read those values back.',
      },
    ],
  },

  /* ======================================================================= *
   * LEVEL 2 - DATA AND ALGORITHMS                                            *
   * ======================================================================= */
  {
    id: 'data-and-algorithms',
    name: 'Data and Algorithms',
    subtitle: 'Data, algorithms and problem solving',
    difficulty: 'Easy',
    icon: '02',
    lessons: [
      {
        id: 'algorithms-and-steps',
        title: 'Algorithms and Steps',
        tagline: 'Clear instructions that solve a problem',
        definition:
          'An algorithm is a finite sequence of clear steps that turns input into a result. A good algorithm is correct, easy to understand and efficient enough for its task.',
        rules: [
          'Every algorithm must stop after a finite number of steps.',
          'Each step must be clear enough for anyone to follow.',
          'An algorithm describes a method, not a single fixed result.',
          'The same algorithm can run on different machines.',
          'Complexity measures how the work grows with the size of the input.',
        ],
        examples: [
          { text: 'A recipe is an algorithm for preparing a dish.', note: 'The ingredients are the input and the dish is the output.' },
          { text: 'Sorting a list of names puts them in alphabetical order.', note: 'Sorting algorithms differ in speed and memory use.' },
          { text: 'Directions on a map guide you from start to destination.', note: 'Each instruction changes your position slightly.' },
        ],
        drill:
          'An algorithm is a finite list of clear steps that turns input into a result. Good algorithms are correct, simple to follow and efficient. Complexity tells us how much work grows as the input gets larger.',
      },
      {
        id: 'variables-and-types',
        title: 'Variables and Data Types',
        tagline: 'Named storage for one kind of value',
        definition:
          'A variable is a named place in memory that holds a value. Its data type decides which operations are valid and how much memory the value needs.',
        rules: [
          'A variable must be declared before it is used.',
          'Common types include integers, floating point numbers, strings and booleans.',
          'A constant holds a value that cannot change while the program runs.',
          'Types may be checked when the program is compiled or while it runs.',
          'Names should describe the purpose of the value that is stored.',
        ],
        examples: [
          { text: 'A counter variable tracks the number of attempts.', note: 'It starts at zero and increases by one.' },
          { text: 'A price may be stored as a floating point number.', note: 'Values with a decimal point need that type.' },
          { text: 'A flag named ready can be true or false.', note: 'Boolean values decide which code runs next.' },
        ],
        drill:
          'A variable stores one value under a name. Its type decides which operations are allowed and how much space it needs. Declare a variable before use, pick names that describe intent, and use constants for values that never change.',
      },
      {
        id: 'conditional-statements',
        title: 'Conditional Statements',
        tagline: 'Making decisions with true and false',
        definition:
          'A conditional runs one block of code only when a condition evaluates to true. Conditions combine comparisons with logical operators such as and, or and not.',
        rules: [
          'Comparison operators include equal, not equal, greater than and less than.',
          'The else branch runs only when the condition fails.',
          'Conditions are read from left to right unless parentheses change the order.',
          'Deep nesting is hard to read, so prefer an early return.',
          'A switch statement tests one value against several constant cases.',
        ],
        examples: [
          { text: 'A program allows entry only when the age is at least eighteen.', note: 'The comparison returns a true or false value.' },
          { text: 'A login screen shows an error when the password is wrong.', note: 'The else branch handles the failed case.' },
          { text: 'A thermostat turns the heater on when the room is cold.', note: 'The condition is checked again after every reading.' },
        ],
        drill:
          'A conditional runs code only when a condition is true. Comparison operators build that condition, and logical operators join several conditions together. Keep each branch small and return early to avoid deep nesting.',
      },
      {
        id: 'loops-and-iteration',
        title: 'Loops and Iteration',
        tagline: 'Repeating work until a condition changes',
        definition:
          'A loop repeats a block of code while a condition holds, or once for each item in a collection. Iteration lets a program handle large amounts of data with very little code.',
        rules: [
          'A for loop is used when the number of repeats is known.',
          'A while loop repeats as long as its condition stays true.',
          'Something inside the loop must change so that it eventually ends.',
          'An off by one error appears when the first or the last item is skipped.',
          'Break out of a loop only for a clear and documented reason.',
        ],
        examples: [
          { text: 'A loop prints every name in a list of students.', note: 'One iteration handles one name.' },
          { text: 'A program retries a download until it works or five tries fail.', note: 'The attempt counter makes the loop end.' },
          { text: 'A game redraws its scene sixty times each second.', note: 'The main loop runs again and again.' },
        ],
        drill:
          'A loop repeats a block of code while a condition stays true. Use a for loop when the count is known and a while loop when it is not. Always change something inside the loop so that it eventually stops.',
      },
      {
        id: 'arrays-and-lists',
        title: 'Arrays and Lists',
        tagline: 'Storing many values under one name',
        definition:
          'An array is an ordered collection of values stored under one name. Every item has an index, and reading by index takes the same time no matter how large the array is.',
        rules: [
          'Indexes usually start at zero, so the last item is at length minus one.',
          'Some languages fix the size of an array while others let it grow.',
          'Inserting or removing an item in the middle shifts the items after it.',
          'A two dimensional array arranges values in rows and columns.',
          'Looping over an array visits each of its items exactly once.',
        ],
        examples: [
          { text: 'An array holds the scores of every player in a match.', note: 'The highest score can be found in one pass.' },
          { text: 'A list of strings stores the lines of a text document.', note: 'Each line keeps its position in the file.' },
          { text: 'A grid represents the board of a puzzle game.', note: 'Two indexes select a row and a column.' },
        ],
        drill:
          'An array keeps many values in order under one name. Each item has an index that starts at zero, so the last item sits at length minus one. Reading by index is fast, while inserting in the middle shifts the other items.',
      },
      {
        id: 'sorting-and-searching',
        title: 'Sorting and Searching',
        tagline: 'Organising data and finding it quickly',
        definition:
          'Sorting rearranges values into a defined order, and searching looks for a specific value. Sorted data can be searched much faster using binary search.',
        rules: [
          'Binary search halves the remaining range on every step.',
          'Linear search checks each item in turn and needs no sorted order.',
          'Bubble sort compares neighbours and swaps them until the list is ordered.',
          'Good comparison sorts take roughly n times log n work.',
          'The right method depends on the size of the data and how often it changes.',
        ],
        examples: [
          { text: 'A phone book is searched by splitting the range in half.', note: 'Binary search needs a sorted list to work.' },
          { text: 'Names are sorted alphabetically before a report is printed.', note: 'Order makes the result easier to read.' },
          { text: 'A small list is scanned from start to finish.', note: 'Linear search suits small or unsorted collections.' },
        ],
        drill:
          'Sorting places values in a known order, and searching looks for one of them. Linear search checks every item, while binary search halves the remaining range at each step. Good sorting finishes in about n times log n work.',
      },
    ],
  },

  /* ======================================================================= *
   * LEVEL 3 - PROGRAMMING CONCEPTS                                          *
   * ======================================================================= */
  {
    id: 'programming-concepts',
    name: 'Programming Concepts',
    subtitle: 'Writing clear and correct programs',
    difficulty: 'Medium',
    icon: '03',
    lessons: [
      {
        id: 'functions-and-parameters',
        title: 'Functions and Parameters',
        tagline: 'Reusable blocks with one clear purpose',
        definition:
          'A function is a named block of code that performs one task and may return a value. Parameters let the same function work with different input data.',
        rules: [
          'A function should do one job and do it well.',
          'Arguments passed at the call site fill the parameters of the function.',
          'A return statement ends the function and sends a value back.',
          'Local variables exist only while the function is running.',
          'Short functions are easier to test, reuse and explain.',
        ],
        examples: [
          { text: 'A function named total adds a list of numbers.', note: 'The caller can use the returned sum anywhere.' },
          { text: 'A greeting function accepts a name as a parameter.', note: 'One function can greet many different people.' },
          { text: 'A drawing program calls a line function for every edge.', note: 'Repetition is handled by small well named helpers.' },
        ],
        drill:
          'A function groups code into a named block that performs one task. Parameters let the same function work on different data, and a return statement sends the result back to the caller. Small focused functions are simple to test and reuse.',
      },
      {
        id: 'recursion',
        title: 'Recursion',
        tagline: 'A function that calls itself',
        definition:
          'Recursion solves a problem by calling the same function on a smaller piece of the same problem. A base case stops the calls, and every step moves toward that case.',
        rules: [
          'Every recursive function needs a base case that returns directly.',
          'Each recursive call must reduce the size of the problem.',
          'The call stack grows by one frame for every unfinished call.',
          'Deep recursion can exhaust memory if no base case is reached.',
          'Many recursive solutions can also be written with a loop.',
        ],
        examples: [
          { text: 'The factorial of five is five times the factorial of four.', note: 'The base case is zero factorial, which equals one.' },
          { text: 'A folder size is the sum of its files and its subfolders.', note: 'Each subfolder is a smaller version of the same task.' },
          { text: 'A tree search visits a node and then each of its children.', note: 'The recursion ends when it reaches the leaves.' },
        ],
        drill:
          'Recursion lets a function call itself on a smaller input. A base case stops the chain of calls, and every other case must move closer to that base. Watch the call stack, because deep recursion uses memory quickly.',
      },
      {
        id: 'strings-and-text',
        title: 'Strings and Text',
        tagline: 'Working with sequences of characters',
        definition:
          'A string is an ordered sequence of characters stored as text. Programs split, join, search and compare strings to handle input, files and messages.',
        rules: [
          'Characters in a string are indexed from zero, just like an array.',
          'Concatenation joins two strings into a new string.',
          'A substring is one continuous part of a longer string.',
          'String comparison is case sensitive unless the text is normalised first.',
          'Escape sequences represent characters that cannot be typed directly.',
        ],
        examples: [
          { text: 'A program splits a full name into a first and a last name.', note: 'The space character marks the boundary.' },
          { text: 'A search box finds every match for a word in a document.', note: 'Each match records a position in the text.' },
          { text: 'A form checks that an email address contains an at sign.', note: 'Simple rules catch many typing mistakes.' },
        ],
        drill:
          'A string stores text as a sequence of characters. You can split it, join it, take a substring or compare it with another string. Indexes start at zero, and comparisons are case sensitive unless the text is normalised first.',
      },
      {
        id: 'objects-and-classes',
        title: 'Objects and Classes',
        tagline: 'Grouping data and behaviour together',
        definition:
          'A class describes the data and behaviour that a kind of object has, and an object is one concrete instance of that class. Objects keep related state next to the code that uses it.',
        rules: [
          'A class acts as a blueprint while each object holds its own values.',
          'Fields store state and methods define behaviour.',
          'Encapsulation hides internal details behind a small public interface.',
          'A constructor runs when a new object is created.',
          'Inheritance lets a class reuse and extend the behaviour of another.',
        ],
        examples: [
          { text: 'A bank account object stores a balance and a withdraw method.', note: 'The balance changes only through the object itself.' },
          { text: 'Every card in a deck is an instance of the same card class.', note: 'Each instance holds its own suit and value.' },
          { text: 'A car class defines speed while each car keeps its own reading.', note: 'Shared structure with separate state.' },
        ],
        drill:
          'A class is a blueprint that combines data and behaviour, and an object is one instance built from that blueprint. Fields hold the state, methods define what the object can do, and encapsulation keeps the internal details private.',
      },
      {
        id: 'debugging-and-testing',
        title: 'Debugging and Testing',
        tagline: 'Finding defects and proving the code works',
        definition:
          'Debugging locates and removes defects, while testing gathers evidence that the program behaves as specified. Together they raise confidence in the software.',
        rules: [
          'Read the error message first, because it usually names the file and line.',
          'Reproduce a bug reliably before trying to fix it.',
          'A unit test checks one small function on its own.',
          'Edge cases include empty input, zero, negative values and the largest value.',
          'Print debugging and a debugger both expose the state at a moment in time.',
        ],
        examples: [
          { text: 'A test feeds an empty list to a function that must return zero.', note: 'Boundary cases cause many real failures.' },
          { text: 'A developer steps through the code one line at a time.', note: 'The debugger shows each variable as it changes.' },
          { text: 'A failing test is kept so the defect cannot return silently.', note: 'Regression tests protect behaviour that already worked.' },
        ],
        drill:
          'Testing shows whether the code matches the specification, and debugging finds the exact line that broke. Reproduce the failure, read the error message, then inspect the values at that point. Add a test so the defect stays fixed.',
      },
      {
        id: 'complexity-and-big-o',
        title: 'Complexity and Big O',
        tagline: 'How the cost of an algorithm grows',
        definition:
          'Big O notation describes how the running time or memory need of an algorithm grows as the input gets larger. It ignores constant factors and keeps the dominant term.',
        rules: [
          'Constant time, written O of one, takes the same time for any input.',
          'Linear time, written O of n, grows in step with the input size.',
          'Quadratic time, written O of n squared, becomes slow on large inputs.',
          'Logarithmic time, written O of log n, appears in binary search.',
          'Measure the worst case unless the average case matters more.',
        ],
        examples: [
          { text: 'Reading one item from an array takes constant time.', note: 'The index points straight to the value.' },
          { text: 'Checking every item in a list takes linear time.', note: 'The work doubles when the list doubles.' },
          { text: 'Comparing every pair of items takes quadratic time.', note: 'Sorting by repeated comparison sits near this bound.' },
        ],
        drill:
          'Big O describes how the cost of an algorithm grows with the input size. Constant time stays flat, linear time rises in step, and quadratic time climbs quickly. Binary search stays logarithmic because every step halves the range.',
      },
    ],
  },

  /* ======================================================================= *
   * LEVEL 4 - SYSTEMS, NETWORKS AND SECURITY                                *
   * ======================================================================= */
  {
    id: 'systems-networks-security',
    name: 'Systems, Networks and Security',
    subtitle: 'Hardware, networks and protection',
    difficulty: 'Hard',
    icon: '04',
    lessons: [
      {
        id: 'operating-systems',
        title: 'Operating Systems',
        tagline: 'The software that manages everything else',
        definition:
          'An operating system is system software that manages hardware and provides services to programs. It controls processes, memory, files, devices and user interaction.',
        rules: [
          'Common operating systems include Windows, Linux and macOS.',
          'The scheduler decides which process uses the processor next.',
          'Virtual memory lets each program believe it owns a large private space.',
          'File systems organise data on persistent storage.',
          'Device drivers translate generic requests into hardware commands.',
        ],
        examples: [
          { text: 'The operating system loads a program into memory before running it.', note: 'It prepares the process and the resources it needs.' },
          { text: 'Several applications run together through process scheduling.', note: 'Each one receives a short turn on the processor.' },
          { text: 'A file is copied from a document folder to a flash drive.', note: 'The file system records where every byte lives.' },
        ],
        drill:
          'The operating system manages the processor, memory, files and devices on behalf of programs. It schedules processes so several applications can run together, and it isolates memory so one fault does not crash the whole machine.',
      },
      {
        id: 'memory-and-storage',
        title: 'Memory and Storage',
        tagline: 'Where data lives and how long it lasts',
        definition:
          'Memory holds data while the computer is running, and storage keeps it after the power is removed. Caching sits between them so frequently used data is quick to reach.',
        rules: [
          'Random access memory is fast but volatile, so it loses data when powered off.',
          'Solid state drives have no moving parts and read data quickly.',
          'Hard disks store large amounts of data at a low cost per gigabyte.',
          'Cache memory is small, close to the processor and very fast.',
          'Swapping moves memory pages to storage when memory runs short.',
        ],
        examples: [
          { text: 'An open document lives in memory while you edit it.', note: 'Saving copies it over to storage.' },
          { text: 'The processor keeps recently used values in cache.', note: 'A cache hit avoids a slow trip to memory.' },
          { text: 'A photo library stays on the drive when the computer is off.', note: 'Storage is persistent by design.' },
        ],
        drill:
          'Memory is fast and temporary, while storage is slower and keeps data after the power is removed. Cache memory sits close to the processor and holds the values used most often. Swapping moves pages out when memory fills up.',
      },
      {
        id: 'databases-and-sql',
        title: 'Databases and SQL',
        tagline: 'Storing structured data and querying it',
        definition:
          'A database organises information so it can be stored, updated and queried efficiently. SQL is the standard language used to read and modify data in a relational database.',
        rules: [
          'A relational database stores data in tables of rows and columns.',
          'A primary key uniquely identifies each row in a table.',
          'The select statement reads the rows that match a condition.',
          'A join combines rows from two tables that share a column.',
          'A transaction keeps several changes so they all apply or none apply.',
        ],
        examples: [
          { text: 'A query lists every order placed in the last seven days.', note: 'The where clause filters the rows.' },
          { text: 'Customers and their addresses are joined on a shared key.', note: 'Joins avoid storing the same data twice.' },
          { text: 'A transfer moves money between two accounts.', note: 'Both balances must change or neither must change.' },
        ],
        drill:
          'A database stores data in tables so it can be searched and updated quickly. SQL reads rows with select, filters them with where, and joins tables that share a key. Transactions keep related changes consistent.',
      },
      {
        id: 'computer-networks',
        title: 'Computer Networks',
        tagline: 'Machines connected to share data',
        definition:
          'A network links devices so they can exchange data using shared rules called protocols. Networks range from a small office setup to the global internet.',
        rules: [
          'Network protocols are arranged in layers, each with its own job.',
          'An address identifies each device on a network.',
          'Packets carry data and are routed hop by hop to their destination.',
          'Bandwidth describes how much data a link can move each second.',
          'Latency is the delay before the first part of a packet arrives.',
        ],
        examples: [
          { text: 'A printer is shared by every computer in the office.', note: 'The local network connects them all.' },
          { text: 'A video call divides its stream into packets.', note: 'Packets may travel along different routes.' },
          { text: 'A wireless access point bridges devices to the wired network.', note: 'Radio carries the frames over the air.' },
        ],
        drill:
          'A network connects devices so they can exchange data under shared protocols. Data is split into packets, addressed, and then routed hop by hop. Bandwidth says how much can move, while latency measures how long the delay lasts.',
      },
      {
        id: 'internet-and-web',
        title: 'The Internet and the Web',
        tagline: 'How a page reaches your browser',
        definition:
          'The internet is the global network of networks, while the web is a service built on top of it. Browsers request pages with the hypertext transfer protocol and render the documents they receive.',
        rules: [
          'A domain name is resolved to an address by the domain name system.',
          'A web address names the protocol, the host and the requested path.',
          'The request and response cycle passes headers and a body.',
          'Secure connections encrypt traffic between browser and server.',
          'Hyperlinks let one document refer to another document.',
        ],
        examples: [
          { text: 'Typing a name in the address bar starts a domain name lookup.', note: 'The lookup returns the numeric address of the server.' },
          { text: 'A browser sends a get request and receives html in reply.', note: 'The response also carries a status code.' },
          { text: 'A shopping site sends form data with a post request.', note: 'The body carries the values that were submitted.' },
        ],
        drill:
          'The internet connects networks worldwide, and the web runs on top of it. A domain name is resolved to an address, the browser sends a request, and the server replies with a document. Secure connections encrypt the exchange.',
      },
      {
        id: 'cybersecurity-basics',
        title: 'Cybersecurity Basics',
        tagline: 'Protecting systems, data and people',
        definition:
          'Cybersecurity protects computers, networks and data from unauthorised access, theft and damage. It combines strong authentication, careful design and good user habits.',
        rules: [
          'Confidentiality, integrity and availability are the core goals of security.',
          'Multi factor authentication requires two or more proofs of identity.',
          'Hashing turns a password into a fixed length value that cannot be reversed.',
          'Encryption scrambles data so that only a key can read it.',
          'Updates close known weaknesses before anyone can exploit them.',
        ],
        examples: [
          { text: 'A password plus a code from a phone gives two factors.', note: 'Stealing one factor is not enough to sign in.' },
          { text: 'A bank checks a transfer against your usual pattern.', note: 'Unusual behaviour triggers an extra check.' },
          { text: 'An encrypted message stays unreadable without the key.', note: 'Even a copied packet reveals nothing useful.' },
        ],
        drill:
          'Security protects data from unauthorised access. Multi factor authentication asks for two proofs of identity, hashing stores passwords as fixed values, and encryption keeps messages private. Installing updates closes known weaknesses early.',
      },
    ],
  },

  /* ======================================================================= *
   * LEVEL 5 - EMERGING TECHNOLOGIES                                         *
   * ======================================================================= */
  {
    id: 'emerging-technologies',
    name: 'Emerging Technologies',
    subtitle: 'AI, the cloud and what comes next',
    difficulty: 'Hard',
    icon: '05',
    lessons: [
      {
        id: 'artificial-intelligence',
        title: 'Artificial Intelligence',
        tagline: 'Machines that act on rules or learned patterns',
        definition:
          'Artificial intelligence is the field that builds systems able to perform tasks that normally need human judgement, such as recognising speech, planning moves or understanding text.',
        rules: [
          'A rule based system follows instructions written by people.',
          'Search explores possible moves before choosing one.',
          'An intelligent agent perceives its environment and acts on it.',
          'Knowledge representation stores facts that a program can reason over.',
          'Many modern systems learn patterns from large amounts of data.',
        ],
        examples: [
          { text: 'A chess program evaluates many positions before it moves.', note: 'Search plus evaluation picks the strongest line.' },
          { text: 'A mail filter decides whether a message is spam.', note: 'It scores the message against learned patterns.' },
          { text: 'A voice assistant turns speech into a text command.', note: 'Recognition is followed by intent detection.' },
        ],
        drill:
          'Artificial intelligence builds systems that perform tasks needing human judgement. Early systems followed written rules, while modern ones learn patterns from data. Agents perceive their surroundings, choose an action and then act on it.',
      },
      {
        id: 'machine-learning-basics',
        title: 'Machine Learning Basics',
        tagline: 'Improving at a task from experience',
        definition:
          'Machine learning trains a model on examples so it can make predictions on new data. Training adjusts internal parameters to reduce the error between predictions and the truth.',
        rules: [
          'Supervised learning trains on labelled examples of the correct answer.',
          'Unsupervised learning looks for structure in data without labels.',
          'Overfitting happens when a model memorises the training data.',
          'A test set measures how the model performs on unseen data.',
          'Features are the measured values given to the model as input.',
        ],
        examples: [
          { text: 'An email model learns from messages already marked as spam.', note: 'Each example carries its correct label.' },
          { text: 'A shop groups customers by their buying habits.', note: 'Clustering needs no correct answers in advance.' },
          { text: 'A model that scores perfectly on training may still fail later.', note: 'Held out data exposes overfitting.' },
        ],
        drill:
          'Machine learning trains a model on examples so it can handle new data. Supervised learning uses labelled examples, while unsupervised learning finds structure on its own. Test on unseen data to check that the model generalises.',
      },
      {
        id: 'cloud-computing',
        title: 'Cloud Computing',
        tagline: 'Computing resources rented over the network',
        definition:
          'Cloud computing delivers servers, storage and services over the internet on demand. Organizations rent capacity instead of buying and maintaining their own hardware.',
        rules: [
          'Infrastructure as a service provides virtual machines and storage.',
          'Platform as a service provides a place to run applications.',
          'Software as a service delivers an application through the browser.',
          'Scaling out adds more machines while scaling up adds power to one.',
          'A cloud region is a physical location that hosts data centres.',
        ],
        examples: [
          { text: 'A new company rents servers and pays only for what it uses.', note: 'Capacity can grow or shrink within minutes.' },
          { text: 'A photo service stores backups in several regions.', note: 'Copies in different places improve resilience.' },
          { text: 'A traffic spike is handled by starting extra instances.', note: 'Auto scaling reacts to demand automatically.' },
        ],
        drill:
          'Cloud computing rents computing capacity over the internet instead of buying hardware. Services are grouped into infrastructure, platform and software layers. Capacity scales out when demand rises and shrinks again when traffic falls.',
      },
      {
        id: 'big-data-and-data-science',
        title: 'Big Data and Data Science',
        tagline: 'Finding meaning in very large datasets',
        definition:
          'Big data refers to collections too large or too fast for ordinary tools, and data science is the practice of turning such data into insight. The work spans collection, cleaning, analysis and communication.',
        rules: [
          'Volume, velocity and variety describe the classic traits of big data.',
          'Cleaning removes duplicates, errors and inconsistent formats.',
          'A pipeline moves raw data through repeatable processing steps.',
          'Visualisation makes patterns visible to a human reader.',
          'Privacy rules limit how personal data may be collected and used.',
        ],
        examples: [
          { text: 'Sensor readings arrive from thousands of devices each minute.', note: 'High velocity calls for streaming tools.' },
          { text: 'Missing values are filled in or removed before analysis.', note: 'Dirty data produces misleading results.' },
          { text: 'A dashboard shows sales trends for the last twelve months.', note: 'A clear chart carries the conclusion quickly.' },
        ],
        drill:
          'Big data describes collections that are large, fast or varied, and data science turns them into useful insight. Clean the data first, move it through a repeatable pipeline, then visualise the result so people can act on it.',
      },
      {
        id: 'quantum-computing',
        title: 'Quantum Computing',
        tagline: 'Computing with qubits and superposition',
        definition:
          'Quantum computing uses the behaviour of very small systems to process information. A qubit can hold a combination of states, which lets some problems be explored in a different way.',
        rules: [
          'A classical bit is either zero or one, while a qubit holds a superposition.',
          'Measurement returns one outcome and ends the superposition.',
          'Entanglement links two qubits so their outcomes are correlated.',
          'Quantum algorithms are useful only for particular shapes of problem.',
          'Today machines need error correction before they can run long jobs.',
        ],
        examples: [
          { text: 'A qubit in superposition is measured as either zero or one.', note: 'The result is a single definite value.' },
          { text: 'Two entangled qubits agree on their result at once.', note: 'The correlation holds across any distance.' },
          { text: 'A quantum search explores many possibilities together.', note: 'Some structured problems gain a clear speed advantage.' },
        ],
        drill:
          'Quantum computers use qubits that hold a superposition of states until they are measured. Entanglement links qubits together, and specialised algorithms explore some problems in a new way. Error correction remains the main challenge.',
      },
      {
        id: 'ethics-in-computing',
        title: 'Ethics in Computing',
        tagline: 'Responsibility, fairness and privacy',
        definition:
          'Computing ethics considers the effect of technology on people and society. Developers weigh fairness, privacy, safety and accountability when they design and ship a system.',
        rules: [
          'Personal data should be collected only for a stated purpose.',
          'Bias in training data can produce unfair automated decisions.',
          'Accessibility means the product works for people with different abilities.',
          'Transparency explains what a system does with the data it holds.',
          'Consider the possible misuse of a feature before releasing it.',
        ],
        examples: [
          { text: 'A hiring tool rejected applicants because of biased history.', note: 'Old patterns can leak into automated choices.' },
          { text: 'A privacy notice states exactly which data is stored.', note: 'Clear wording helps people decide.' },
          { text: 'Captions and keyboard support make a site usable by more people.', note: 'Accessibility is part of quality, not an extra.' },
        ],
        drill:
          'Computing ethics asks how a system affects people. Collect only the data you need, check training sets for bias, and explain clearly what happens to personal information. Design for accessibility and consider misuse before release.',
      },
    ],
  },
];