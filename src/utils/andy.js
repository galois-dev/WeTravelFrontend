let d = new Date();
let d_p1 = new Date(d).setHours(d.getHours() + 1);
let d_p2 = new Date(d).setHours(d.getHours() + 2);
let d_p3 = new Date(d).setHours(d.getHours() + 3);

const events = [
    {
        from: d,
        to: d_p1,
        title: "experience_test1",
        banner: {
            url:
                "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80",
            alt: "test picture",
        },
    },
    {
        from: d,
        to: d_p2,
        title: "experience_test2",
        banner: {
            url:
                "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80",
            alt: "test picture",
        },
    },
    {
        from: d_p1,
        to: d_p3,
        title: "experience_test3",
        banner: {
            url:
                "https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1825&q=80",
            alt: "test picture",
        },
    },
]

function get_calendar_width_by_dateTime(date, Events) {
    //console.log(date);
    if (Events !== undefined) {
        // Sort events by day and time
        let sortedEvents = Events;
        sortedEvents = sortedEvents.sort((a, b) => (a.to > b.to ? 1 : -1));
        let min = new Date(date),
            max = min,
            n_width = 0;
        let usedEvents = {}
        sortedEvents.forEach((i) => {
            //console.log(i);
            for (let j = 0; j < sortedEvents.length; j++) {
                if (usedEvents[j] === undefined) {

                    let Ax = sortedEvents[j];
                    Ax.to = new Date(Ax.to);
                    Ax.from = new Date(Ax.from);
                    //console.log(Ax);
                    if (
                        (Ax.from <= max && Ax.to >= min) || // Full body is in
                        (Ax.from <= min && Ax.to >= min) || // Just the foot
                        (Ax.from <= max && Ax.to >= max) // Just the head
                    ) {
                        console.log(Ax);
                        // Redefine search boundaries
                        if (Ax.from < min) {
                            min = Ax.from;
                        }
                        if (Ax.to > max) {
                            max = Ax.to;
                        }
                        n_width += 1; // Increment registered searchspace occupancy by 
                        usedEvents[j] = j
                        //sortedEvents.splice(j, 1); // Remove entry to about double counting
                    }
                }
            }
        });
        return n_width;
    }
}
console.log(get_calendar_width_by_dateTime(d, events))
