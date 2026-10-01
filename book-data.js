/* =============================================================================
 * book-data.js
 * -----------------------------------------------------------------------------
 * "Computer Science Fundamentals" - The CS Handbook (the Reader section)
 *
 * The typing content has been changed from English grammar to computer science
 * fundamentals while keeping the same data structure used by the application.
 *
 * NOTE: every `text` field must stay plain ASCII (straight quotes and hyphens
 * only) because it is the string the learner types character by character.
 * ========================================================================== */

const BOOK_SECTION = {
  id: 'computer-science-fundamentals',
  name: 'Computer Science Fundamentals',
  icon: '07',
  title: 'Computer Science Fundamentals',
  author: 'TypeGrammar Learning Series',
  year: 2026,
  source: 'Original educational content',
  sourceUrl: '',
  blurb:
    'Learn computer science fundamentals by typing real explanations, examples, and technical concepts. Read the notes, understand the idea, then type the page exactly as shown.',

  parts: [
    /* ══════════════════════════════════════════════════════════════════ *
     * PART 1
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-1',
      title: 'Computer Basics',
      subtitle: 'Chapter I - Understanding Computers',
      summary:
        'Learn what computers are, how they process information, and the main parts of a computer system.',

      pages: [
        {
          id: 'part-1-p1',
          focus: 'What a computer is and how it processes information',

          text: `A computer is an electronic machine that receives data, processes it according to instructions, stores information, and produces results. The basic process can be described as input, processing, output, and storage. When you type something on a keyboard, the computer receives input. The processor works with that information, and the system produces an output such as text on a screen. Computers can perform millions or billions of operations very quickly, but they still depend on instructions created by humans.`,

          notes: [
            {
              term: 'Computer',
              definition:
                'An electronic system that accepts input, processes data according to instructions, stores information, and produces output.',
              example:
                'A laptop receives keyboard input, processes it, and displays the result on the screen.',
            },
            {
              term: 'Input',
              definition:
                'Information or signals provided to a computer system.',
              example:
                'A keyboard, mouse, microphone, and camera can provide input.',
            },
            {
              term: 'Processing',
              definition:
                'The operations performed by the computer to transform input data into useful information.',
              example:
                'A processor calculates the result of a mathematical operation.',
            },
            {
              term: 'Output',
              definition:
                'The information produced by a computer after processing data.',
              example:
                'A monitor displaying a message is an example of output.',
            },
          ],
        },

        {
          id: 'part-1-p2',
          focus: 'Hardware and software',

          text: `Computer systems are made from hardware and software. Hardware refers to the physical parts that you can touch, such as the processor, memory, motherboard, storage drive, keyboard, and monitor. Software consists of programs and instructions that tell the hardware what to do. An operating system is software, and a web browser is also software. Hardware and software work together. A powerful computer without useful software cannot perform meaningful tasks, while software cannot run without suitable hardware.`,

          notes: [
            {
              term: 'Hardware',
              definition:
                'The physical components of a computer system that can be seen or touched.',
              example:
                'CPU, RAM, motherboard, SSD, keyboard, and monitor.',
            },
            {
              term: 'Software',
              definition:
                'Programs and instructions that control computer hardware and perform tasks.',
              example:
                'Windows, Linux, a web browser, or a code editor.',
            },
            {
              term: 'CPU',
              definition:
                'The central processing unit executes instructions and performs calculations.',
              example:
                'The CPU executes instructions from a running program.',
            },
            {
              term: 'System',
              definition:
                'A collection of hardware and software components working together to perform tasks.',
              example:
                'A laptop running an operating system and applications is a computer system.',
            },
          ],
        },

        {
          id: 'part-1-p3',
          focus: 'Data, information, and binary representation',

          text: `Computers represent information using binary values. Binary uses only two digits, zero and one. A single binary digit is called a bit. Eight bits make one byte. Larger units such as kilobytes, megabytes, gigabytes, and terabytes are used to describe storage capacity. Text, numbers, images, audio, and video can all be represented as digital data. Understanding binary is important because computers ultimately work with electronic states that can be represented as zero or one.`,

          notes: [
            {
              term: 'Binary',
              definition:
                'A number system that uses only two digits: zero and one.',
              example: 'The binary value 101 represents a number using base two.',
            },
            {
              term: 'Bit',
              definition:
                'The smallest basic unit of digital information and can represent 0 or 1.',
              example: 'A bit can have the value 0 or the value 1.',
            },
            {
              term: 'Byte',
              definition:
                'A group of eight bits commonly used as a basic unit of digital storage.',
              example:
                'The character A can be represented using one byte in some character encodings.',
            },
            {
              term: 'Digital data',
              definition:
                'Information represented in a form that computers can store and process.',
              example:
                'Digital images, text files, and music files are digital data.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 2
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-2',
      title: 'Operating Systems',
      subtitle: 'Chapter II - Managing a Computer',
      summary:
        'Understand operating systems, processes, files, memory, and user interfaces.',

      pages: [
        {
          id: 'part-2-p1',
          focus: 'The role of an operating system',

          text: `An operating system is the main software that manages a computer's hardware and provides services for other programs. It manages memory, processes, files, devices, and user interaction. When you open an application, the operating system helps load the program into memory and provides access to resources that the program needs. Common operating systems include Windows, Linux, macOS, Android, and other specialized systems.`,

          notes: [
            {
              term: 'Operating system',
              definition:
                'System software that manages hardware resources and provides services for applications.',
              example:
                'Windows and Linux are operating systems used on personal computers.',
            },
            {
              term: 'Process',
              definition:
                'A program that is currently being executed by the operating system.',
              example:
                'When you open a browser, the operating system creates processes for it.',
            },
            {
              term: 'Resource',
              definition:
                'A hardware or software capability that programs need in order to operate.',
              example:
                'CPU time, memory, storage, and network access are resources.',
            },
            {
              term: 'Application',
              definition:
                'A software program designed to perform a task for the user.',
              example:
                'A browser, text editor, or image editor is an application.',
            },
          ],
        },

        {
          id: 'part-2-p2',
          focus: 'Files, folders, and storage',

          text: `A file is a collection of data stored under a name. Files are organized into folders so that users and programs can find them more easily. A file can contain text, images, source code, audio, video, or other information. The operating system manages access to files and keeps track of where they are stored. File extensions often describe the type of data contained in a file, such as .html for an HTML document, .css for a stylesheet, and .js for a JavaScript file.`,

          notes: [
            {
              term: 'File',
              definition:
                'A named collection of data stored on a computer or storage system.',
              example: 'index.html is a file containing HTML code.',
            },
            {
              term: 'Folder',
              definition:
                'A container used to organize files and other folders.',
              example:
                'A project folder can contain HTML, CSS, JavaScript, and image files.',
            },
            {
              term: 'File extension',
              definition:
                'The part of a filename that commonly indicates the file type.',
              example: '.js identifies a JavaScript source file.',
            },
            {
              term: 'Storage',
              definition:
                'A place where data is kept so it can be retrieved later.',
              example:
                'An SSD stores applications, documents, images, and other files.',
            },
          ],
        },

        {
          id: 'part-2-p3',
          focus: 'Memory and multitasking',

          text: `Computer memory provides temporary space for programs and data that are actively being used. Random access memory, usually called RAM, is much faster than long term storage but normally loses its contents when the computer is turned off. Modern operating systems allow many programs to appear to run at the same time. The operating system rapidly manages processor time and memory so that multiple applications can operate together.`,

          notes: [
            {
              term: 'RAM',
              definition:
                'Temporary memory used by the computer to store programs and data that are actively being used.',
              example:
                'Opening several large applications can increase RAM usage.',
            },
            {
              term: 'Temporary memory',
              definition:
                'Memory used while information is actively needed by running programs.',
              example:
                'RAM stores data required by currently running applications.',
            },
            {
              term: 'Multitasking',
              definition:
                'The ability of an operating system to manage multiple running tasks.',
              example:
                'You can listen to music while writing code and browsing the web.',
            },
            {
              term: 'Memory management',
              definition:
                'The process of controlling how memory is allocated and used by programs.',
              example:
                'The operating system assigns memory to applications as they run.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 3
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-3',
      title: 'Programming Fundamentals',
      subtitle: 'Chapter III - Thinking Like a Programmer',
      summary:
        'Learn variables, data types, conditions, loops, and functions.',

      pages: [
        {
          id: 'part-3-p1',
          focus: 'Variables and data types',

          text: `A variable is a named place used by a program to store a value. The value may represent a number, text, a true or false state, or a more complex structure. Programming languages provide different data types to describe different kinds of values. Choosing appropriate data types makes programs easier to understand and helps prevent errors. In JavaScript, common types include string, number, boolean, undefined, null, object, and symbol.`,

          notes: [
            {
              term: 'Variable',
              definition:
                'A named reference used by a program to store or access a value.',
              example: 'let age = 20;',
            },
            {
              term: 'String',
              definition:
                'A sequence of characters used to represent text.',
              example: 'const name = "Wahid";',
            },
            {
              term: 'Number',
              definition:
                'A numeric value used for mathematical calculations and other numeric operations.',
              example: 'const score = 95;',
            },
            {
              term: 'Boolean',
              definition:
                'A value that can be true or false.',
              example: 'const isLoggedIn = true;',
            },
          ],
        },

        {
          id: 'part-3-p2',
          focus: 'Conditions and decision making',

          text: `Programs often need to make decisions. A conditional statement checks whether a condition is true or false and then chooses what to do. The if statement runs code when its condition is true. An else block can provide an alternative when the condition is false. Multiple conditions can be handled with else if or with other control structures. Conditional logic is one of the most important tools for building interactive software.`,

          notes: [
            {
              term: 'Condition',
              definition:
                'An expression that produces a result such as true or false.',
              example: 'age >= 18',
            },
            {
              term: 'if statement',
              definition:
                'A control structure that executes code when a condition is true.',
              example: 'if (score >= 50) { pass(); }',
            },
            {
              term: 'else',
              definition:
                'A block that runs when the associated if condition is false.',
              example: 'else { fail(); }',
            },
            {
              term: 'Control flow',
              definition:
                'The order in which instructions in a program are executed.',
              example:
                'An if statement can change which instructions execute next.',
            },
          ],
        },

        {
          id: 'part-3-p3',
          focus: 'Loops and repetition',

          text: `A loop allows a program to repeat a block of instructions. Loops are useful when the same operation must be performed many times. A for loop is commonly used when the number of repetitions is known or can be controlled with a counter. A while loop continues while its condition remains true. Programmers must make sure that a loop can eventually stop; otherwise the program may enter an infinite loop and continue running without reaching the expected result.`,

          notes: [
            {
              term: 'Loop',
              definition:
                'A programming structure that repeats a block of instructions.',
              example: 'A loop can process every item in an array.',
            },
            {
              term: 'for loop',
              definition:
                'A loop commonly used when repetition can be controlled by an initialization, condition, and update.',
              example: 'for (let i = 0; i < 5; i++) {}',
            },
            {
              term: 'while loop',
              definition:
                'A loop that continues executing while a condition is true.',
              example: 'while (count < 10) { count++; }',
            },
            {
              term: 'Infinite loop',
              definition:
                'A loop that never reaches a stopping condition.',
              example:
                'A while loop whose condition never becomes false can run forever.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 4
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-4',
      title: 'Web Fundamentals',
      subtitle: 'Chapter IV - How the Web Works',
      summary:
        'Understand HTML, CSS, JavaScript, browsers, URLs, and HTTP.',

      pages: [
        {
          id: 'part-4-p1',
          focus: 'HTML, CSS, and JavaScript',

          text: `The web is built from several technologies that work together. HTML defines the structure and meaning of a web page. CSS controls presentation, layout, colors, spacing, and responsive behavior. JavaScript adds logic and interaction. A simple website may use an HTML document connected to a CSS stylesheet and a JavaScript file. Separating structure, presentation, and behavior helps developers organize their code and maintain projects more easily.`,

          notes: [
            {
              term: 'HTML',
              definition:
                'A markup language used to define the structure and meaning of web content.',
              example:
                'HTML can create headings, paragraphs, links, images, and forms.',
            },
            {
              term: 'CSS',
              definition:
                'A stylesheet language used to control the visual presentation of documents.',
              example:
                'CSS controls colors, layout, spacing, and responsive design.',
            },
            {
              term: 'JavaScript',
              definition:
                'A programming language commonly used to add behavior and interaction to web pages.',
              example:
                'JavaScript can respond when a user clicks a button.',
            },
            {
              term: 'Responsive design',
              definition:
                'An approach that allows a website to adapt to different screen sizes and devices.',
              example:
                'A responsive layout can work on both a phone and a desktop.',
            },
          ],
        },

        {
          id: 'part-4-p2',
          focus: 'Browsers and the DOM',

          text: `A web browser requests resources from a server and displays the resulting web page. When a browser loads an HTML document, it creates a Document Object Model, commonly called the DOM. The DOM represents the page as a tree of objects. JavaScript can use the DOM to find elements, change text, modify styles, add classes, respond to events, and create new elements. This connection between JavaScript and the DOM makes web pages interactive.`,

          notes: [
            {
              term: 'Browser',
              definition:
                'Software that retrieves and displays web content.',
              example:
                'Chrome, Firefox, Edge, and Safari are web browsers.',
            },
            {
              term: 'DOM',
              definition:
                'A programming representation of an HTML document as a tree of objects.',
              example:
                'JavaScript can select a button through the DOM.',
            },
            {
              term: 'Element',
              definition:
                'A structural part of an HTML document represented in the DOM.',
              example:
                'A paragraph, button, or heading is an HTML element.',
            },
            {
              term: 'Event',
              definition:
                'An action or occurrence that JavaScript can respond to.',
              example:
                'A click event occurs when a user clicks a button.',
            },
          ],
        },

        {
          id: 'part-4-p3',
          focus: 'URLs, HTTP, requests, and responses',

          text: `When a browser needs a web resource, it can send an HTTP request to a server. The server processes the request and sends an HTTP response. A URL identifies the location of a resource on the web. HTTP methods describe the type of operation being requested. GET is commonly used to retrieve data, while POST is commonly used to send data to a server. Understanding requests and responses is essential for building applications that communicate with APIs and backend services.`,

          notes: [
            {
              term: 'URL',
              definition:
                'A web address used to identify the location of a resource.',
              example:
                'https://example.com/about identifies a web resource.',
            },
            {
              term: 'HTTP',
              definition:
                'A protocol used for communication between clients and web servers.',
              example:
                'A browser can send an HTTP request to a web server.',
            },
            {
              term: 'Request',
              definition:
                'A message sent by a client asking a server to perform an operation or provide information.',
              example:
                'A browser sends a GET request to retrieve a web page.',
            },
            {
              term: 'Response',
              definition:
                'A message returned by a server after processing a request.',
              example:
                'A server can respond with HTML, JSON, or an error status.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 5
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-5',
      title: 'Data Structures',
      subtitle: 'Chapter V - Organizing Data',
      summary:
        'Learn arrays, objects, stacks, queues, and why data organization matters.',

      pages: [
        {
          id: 'part-5-p1',
          focus: 'Arrays and collections',

          text: `An array is a data structure used to store an ordered collection of values. Each item in an array has a position called an index. In many programming languages, the first index is zero. Arrays are useful when a program needs to store multiple related values and process them together. JavaScript provides methods such as map, filter, find, push, and pop for working with arrays. Choosing the right operation can make code shorter, clearer, and easier to maintain.`,

          notes: [
            {
              term: 'Array',
              definition:
                'An ordered collection of values stored under one variable or data structure.',
              example: 'const names = ["Ali", "Sara", "John"];',
            },
            {
              term: 'Index',
              definition:
                'A position used to access an item in an ordered collection.',
              example:
                'The first item of a JavaScript array has index 0.',
            },
            {
              term: 'map',
              definition:
                'An array method that creates a new array by transforming each item.',
              example:
                'numbers.map(number => number * 2)',
            },
            {
              term: 'filter',
              definition:
                'An array method that creates a new array containing items that satisfy a condition.',
              example:
                'numbers.filter(number => number > 10)',
            },
          ],
        },

        {
          id: 'part-5-p2',
          focus: 'Objects and structured data',

          text: `An object stores related information using properties and values. Objects are useful when a piece of data has several characteristics. For example, a student object might contain a name, age, course, and score. Objects can also contain functions called methods. Modern applications use objects extensively because they provide a convenient way to represent real entities such as users, products, messages, and configuration settings.`,

          notes: [
            {
              term: 'Object',
              definition:
                'A data structure that stores related information using properties and values.',
              example:
                'const student = { name: "Ali", score: 90 };',
            },
            {
              term: 'Property',
              definition:
                'A named value stored inside an object.',
              example:
                'name is a property of the student object.',
            },
            {
              term: 'Value',
              definition:
                'The data associated with a variable, property, or expression.',
              example:
                'The value of student.score could be 90.',
            },
            {
              term: 'Method',
              definition:
                'A function stored as a property of an object.',
              example:
                'An object can have a method called login().',
            },
          ],
        },

        {
          id: 'part-5-p3',
          focus: 'Stacks and queues',

          text: `A stack and a queue are common data structures with different rules for removing elements. A stack follows the last in, first out principle. The most recently added item is removed first. A queue follows the first in, first out principle. The first item added is removed first. These structures appear in many areas of computing. Browser history, function calls, task scheduling, and message processing can all use ideas related to stacks or queues.`,

          notes: [
            {
              term: 'Stack',
              definition:
                'A data structure that follows the last in, first out principle.',
              example:
                'The last item pushed onto a stack is the first item removed.',
            },
            {
              term: 'Queue',
              definition:
                'A data structure that follows the first in, first out principle.',
              example:
                'The first task added to a queue is normally processed first.',
            },
            {
              term: 'LIFO',
              definition:
                'Last in, first out. The newest item is handled first.',
              example:
                'A stack uses LIFO behavior.',
            },
            {
              term: 'FIFO',
              definition:
                'First in, first out. The oldest item is handled first.',
              example:
                'A queue uses FIFO behavior.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 6
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-6',
      title: 'Algorithms',
      subtitle: 'Chapter VI - Solving Problems',
      summary:
        'Understand algorithms, searching, sorting, and computational efficiency.',

      pages: [
        {
          id: 'part-6-p1',
          focus: 'What an algorithm is',

          text: `An algorithm is a clear sequence of steps used to solve a problem or perform a task. Algorithms are not limited to programming. A recipe, a mathematical procedure, and instructions for finding a file can all be viewed as algorithms. In software development, algorithms must be precise enough for a computer to execute. A good algorithm should solve the intended problem correctly and should use resources such as time and memory in a reasonable way.`,

          notes: [
            {
              term: 'Algorithm',
              definition:
                'A defined sequence of steps for solving a problem or completing a task.',
              example:
                'A sorting algorithm organizes a collection of values into an order.',
            },
            {
              term: 'Input',
              definition:
                'The data provided to an algorithm before processing begins.',
              example:
                'An algorithm that finds the largest number receives a list of numbers.',
            },
            {
              term: 'Output',
              definition:
                'The result produced by an algorithm after processing its input.',
              example:
                'The largest number is the output of a maximum-finding algorithm.',
            },
            {
              term: 'Correctness',
              definition:
                'The property of an algorithm producing the expected result for valid inputs.',
              example:
                'A sorting algorithm should place values in the requested order.',
            },
          ],
        },

        {
          id: 'part-6-p2',
          focus: 'Searching and sorting',

          text: `Searching means finding a particular value in a collection of data. A simple linear search checks items one by one until the target is found or there are no more items. A binary search works differently. It repeatedly divides a sorted collection into smaller sections and determines which section can contain the target. Sorting algorithms organize data according to a chosen order. Different algorithms have different performance characteristics, so developers choose them according to the problem and the data.`,

          notes: [
            {
              term: 'Linear search',
              definition:
                'A search method that examines elements one by one until the target is found or the collection ends.',
              example:
                'Searching an unsorted list from the first item to the last.',
            },
            {
              term: 'Binary search',
              definition:
                'A search algorithm that repeatedly divides a sorted collection to locate a target.',
              example:
                'A binary search can quickly locate a word in a sorted list.',
            },
            {
              term: 'Sorting',
              definition:
                'The process of arranging data according to a specified order.',
              example:
                'Sorting numbers from smallest to largest.',
            },
            {
              term: 'Target',
              definition:
                'The value or item an algorithm is trying to locate.',
              example:
                'In a search operation, the target might be the number 42.',
            },
          ],
        },

        {
          id: 'part-6-p3',
          focus: 'Time complexity and Big O',

          text: `When programmers compare algorithms, they often consider how the amount of work changes as the input becomes larger. Big O notation provides a way to describe the growth of an algorithm's resource requirements. An algorithm with constant time is often described as O(1). A simple loop through n items is commonly O(n). An algorithm that repeatedly divides the problem in half can have logarithmic complexity, written as O(log n). Understanding complexity helps developers choose algorithms that remain practical as applications grow.`,

          notes: [
            {
              term: 'Big O notation',
              definition:
                'A notation used to describe how an algorithm\'s resource requirements grow as input size increases.',
              example: 'Linear search is commonly described as O(n).',
            },
            {
              term: 'O(1)',
              definition:
                'Constant complexity, where the amount of work does not depend on the input size in the described operation.',
              example:
                'Accessing an array element by index is commonly treated as O(1).',
            },
            {
              term: 'O(n)',
              definition:
                'Linear complexity, where work grows approximately in proportion to the input size.',
              example:
                'A loop that examines every item once is commonly O(n).',
            },
            {
              term: 'O(log n)',
              definition:
                'Logarithmic complexity, where the problem size is repeatedly reduced by a factor such as two.',
              example:
                'Binary search has O(log n) search complexity on a sorted collection.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 7
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-7',
      title: 'Databases',
      subtitle: 'Chapter VII - Storing Information',
      summary:
        'Learn databases, tables, SQL, records, relationships, and queries.',

      pages: [
        {
          id: 'part-7-p1',
          focus: 'What databases are',

          text: `A database is an organized collection of data that can be stored, searched, updated, and managed by software. Applications use databases when they need to work with information that must persist beyond a single program session. A university system might store students and courses. An online store might store products, customers, orders, and payments. Database systems provide tools that allow applications to work with large amounts of structured information efficiently.`,

          notes: [
            {
              term: 'Database',
              definition:
                'An organized collection of data that can be stored, accessed, and managed.',
              example:
                'An application can store user accounts in a database.',
            },
            {
              term: 'Database management system',
              definition:
                'Software used to create, manage, access, and maintain databases.',
              example:
                'PostgreSQL and MySQL are database management systems.',
            },
            {
              term: 'Record',
              definition:
                'A collection of related fields representing one item or entity.',
              example:
                'One student record can contain an ID, name, and email.',
            },
            {
              term: 'Persistent data',
              definition:
                'Data that remains stored after a program or computer session ends.',
              example:
                'A registered user\'s account remains in the database after the browser closes.',
            },
          ],
        },

        {
          id: 'part-7-p2',
          focus: 'Tables, rows, columns, and SQL',

          text: `Relational databases organize information into tables. A table contains rows and columns. A row normally represents one record, while a column represents a particular type of information. SQL is a language used to communicate with relational databases. Developers can use SQL to retrieve, insert, update, and delete data. A query can select only the information required by an application instead of loading every record from a table.`,

          notes: [
            {
              term: 'Table',
              definition:
                'A structured collection of related data organized into rows and columns.',
              example:
                'A users table can contain information about application users.',
            },
            {
              term: 'Row',
              definition:
                'A single record in a relational database table.',
              example:
                'One row can represent one customer.',
            },
            {
              term: 'Column',
              definition:
                'A field representing one type of information in a table.',
              example:
                'A users table might have name, email, and password columns.',
            },
            {
              term: 'SQL',
              definition:
                'A language commonly used to work with relational databases.',
              example:
                'SELECT name FROM users;',
            },
          ],
        },

        {
          id: 'part-7-p3',
          focus: 'Keys and relationships',

          text: `Database tables often use keys to identify records and connect related information. A primary key uniquely identifies a record within a table. A foreign key stores a reference to a record in another table. Relationships allow databases to represent connected information without storing the same data repeatedly. For example, an order can contain a customer identifier that connects the order to a particular customer record.`,

          notes: [
            {
              term: 'Primary key',
              definition:
                'A value used to uniquely identify a record in a table.',
              example:
                'A student_id can uniquely identify each student.',
            },
            {
              term: 'Foreign key',
              definition:
                'A field that references a record in another table.',
              example:
                'customer_id in an orders table can reference a customer.',
            },
            {
              term: 'Relationship',
              definition:
                'A connection between related records or entities in a database.',
              example:
                'A customer can have many orders.',
            },
            {
              term: 'Relational database',
              definition:
                'A database system that organizes data into related tables.',
              example:
                'A university database can have students, courses, and enrollments tables.',
            },
          ],
        },
      ],
    },

    /* ══════════════════════════════════════════════════════════════════ *
     * PART 8
     * ══════════════════════════════════════════════════════════════════ */
    {
      id: 'part-8',
      title: 'Computer Networks',
      subtitle: 'Chapter VIII - Connected Computers',
      summary:
        'Understand networks, IP addresses, DNS, servers, clients, and the internet.',

      pages: [
        {
          id: 'part-8-p1',
          focus: 'Computer networks and the internet',

          text: `A computer network connects devices so that they can communicate and share resources. Networks can be small, such as a home network, or extremely large, such as the global internet. Devices communicate by following protocols that define how data should be transmitted and interpreted. Network communication allows users to access websites, send messages, share files, use online applications, and communicate with computers located in other parts of the world.`,

          notes: [
            {
              term: 'Computer network',
              definition:
                'A group of connected devices that can communicate and share resources.',
              example:
                'Computers connected through a home Wi-Fi network form a network.',
            },
            {
              term: 'Internet',
              definition:
                'A global system of interconnected networks that communicate using standardized protocols.',
              example:
                'Websites and online services are accessed through the internet.',
            },
            {
              term: 'Protocol',
              definition:
                'A set of rules that defines how systems communicate.',
              example:
                'HTTP is a protocol used for web communication.',
            },
            {
              term: 'Network device',
              definition:
                'Hardware used to connect, direct, or communicate data between devices.',
              example:
                'Routers and switches are common network devices.',
            },
          ],
        },

        {
          id: 'part-8-p2',
          focus: 'IP addresses, domains, and DNS',

          text: `Devices communicating on a network use addresses so that data can reach the correct destination. An IP address identifies a device or network interface within an addressing system. Humans usually prefer domain names because they are easier to remember than numerical addresses. The Domain Name System, called DNS, translates domain names into IP addresses so that clients can locate the appropriate servers. This process happens behind the scenes when a user visits a website.`,

          notes: [
            {
              term: 'IP address',
              definition:
                'A numerical network address used to identify a device or interface in an IP network.',
              example:
                'A server can have an IPv4 address such as 192.168.1.10 on a private network.',
            },
            {
              term: 'Domain name',
              definition:
                'A human-readable name used to identify an internet resource.',
              example: 'example.com is a domain name.',
            },
            {
              term: 'DNS',
              definition:
                'The Domain Name System translates domain names into network addresses.',
              example:
                'DNS can help a browser find the server associated with example.com.',
            },
            {
              term: 'Server',
              definition:
                'A computer or software system that provides resources or services to other systems.',
              example:
                'A web server can provide HTML pages to browsers.',
            },
          ],
        },

        {
          id: 'part-8-p3',
          focus: 'Clients, servers, and APIs',

          text: `Many modern applications use a client and server architecture. A client sends requests to a server, and the server processes those requests and returns responses. Web applications often use APIs to allow different software systems to communicate. An API defines how a client can request data or perform an operation. A JavaScript application might request user information from an API, receive JSON data, and then display that information in the browser.`,

          notes: [
            {
              term: 'Client',
              definition:
                'A program or device that requests services or data from another system.',
              example:
                'A web browser acts as a client when it requests a web page.',
            },
            {
              term: 'Server',
              definition:
                'A system that receives requests and provides data or services to clients.',
              example:
                'An API server can return user data to a frontend application.',
            },
            {
              term: 'API',
              definition:
                'A defined interface that allows software systems to communicate with each other.',
              example:
                'A frontend can use an API to request product information.',
            },
            {
              term: 'JSON',
              definition:
                'A text-based data format commonly used for exchanging structured information between applications.',
              example:
                '{"name":"Ali","score":95}',
            },
          ],
        },
      ],
    },
  ],
};

/* Convenience totals for the interface. */
const BOOK_PAGE_COUNT = BOOK_SECTION.parts.reduce(
  (sum, part) => sum + part.pages.length,
  0
);