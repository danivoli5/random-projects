const { Observable } = require("rxjs");
const { pluck, map, filter } = require("rxjs/operators");

const users = {
    data: [
        {
            id: 1,
            status: "active",
            age: 10,
        },
        {
            id: 1,
            status: "inactive",
            age: 12,
        },
        {
            id: 1,
            status: "active",
            age: 42,
        },
        {
            id: 1,
            status: "inactive",
            age: 42,
        },
        {
            id: 1,
            status: "active",
            age: 13,
        },
        {
            id: 1,
            status: "inactive",
            age: 75,
        },
        {
            id: 1,
            status: "inactive",
            age: 43,
        },
        {
            id: 1,
            status: "inactive",
            age: 54,
        },
        {
            id: 1,
            status: "active",
            age: 7,
        },
        {
            id: 1,
            status: "active",
            age: 17,
        },
    ],
};

const users2 = {
    data: [
        {
            id: 1,
            status: "active",
            age: 14,
        },
        {
            id: 1,
            status: "inactive",
            age: 12,
        },
        {
            id: 1,
            status: "active",
            age: 42,
        },
        {
            id: 1,
            status: "inactive",
            age: 42,
        },
        {
            id: 1,
            status: "active",
            age: 13,
        },
        {
            id: 1,
            status: "inactive",
            age: 75,
        },
        {
            id: 1,
            status: "inactive",
            age: 43,
        },
        {
            id: 1,
            status: "inactive",
            age: 54,
        },
        {
            id: 1,
            status: "active",
            age: 7,
        },
        {
            id: 1,
            status: "active",
            age: 17,
        },
    ],
};

const observable = new Observable((subscriber) => {
    // send users to the Observable pipe
    subscriber.next(users2);
}).pipe(
    map((value) => {
        //console.log('1)Got data from observable: ' + JSON.stringify(value));
        return value.data;
    }),
    map((value) => {
        //console.log('2)Got data from first operator: ' + JSON.stringify(value));
        return value.filter(user => user.status === 'active');
    }),
    map((value) => {
        //console.log('3)Got data from second operator: ' + JSON.stringify(value));
        // Return the avrage age of users
        return value.reduce((sum, user) => sum + user.age, 0) / value.length;
    }),
    map((value) => {
        //console.log('4)Got data from third operator: ' + value);
        if (value < 18) throw new Error('Avrage age is too young');
        else return value;
    }),
);


const observer = {
    next: (value) => {
        console.log("****Observer got a value of " + value);
    },
    error: (err) => {
        console.log("Observer got an error" + err);
    },
    complete: () => {
        console.log("Observer got a complete notofication");
    }
}

// subscribe to Observable
observable.subscribe(observer);