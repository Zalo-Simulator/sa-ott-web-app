import API from '$lib/api/Interceptor'
import { USER_API } from '$lib/api/API-Endpoint'

const peopleName = [
    "Alice Johnson", "Bob Smith", "Charlie Brown", "David White", "Emma Wilson",
    "Frank Thomas", "Grace Hall", "Henry Allen", "Isabella King", "Jack Wright",
    "Karen Scott", "Leo Adams", "Mia Roberts", "Noah Lewis", "Olivia Walker",
    "Peter Young", "Quinn Harris", "Ryan Nelson", "Sophia Carter", "Thomas Mitchell",
    "Uma Perez", "Victor Turner", "William Collins", "Xavier Edwards", "Yvonne Stewart",
    "Zachary Barnes", "Amy Simmons", "Brian Foster", "Catherine Butler", "Daniel Morris",
    "Eleanor Reed", "Felix Howard", "Gabriella Bell", "Harold Murphy", "Ivy Rogers",
    "Jacob Cook", "Kylie Bailey", "Liam Cooper", "Madeline Hughes", "Nathan Ward",
    "Oscar Jenkins", "Penelope Price", "Quentin Sanders", "Rebecca Patterson", "Samuel Gray",
    "Tiffany Long", "Ulysses Russell", "Vanessa Griffin", "Wesley Hayes", "Zoe Brooks",
    "Aaron Bennett", "Bella Carter", "Caleb Diaz", "Daisy Evans", "Ethan Flores",
    "Fiona Garcia", "George Harrison", "Hannah Ingram", "Isaac Johnson", "Jasmine Kim",
    "Kevin Lopez", "Lillian Martinez", "Mason Nelson", "Natalie Owens", "Owen Parker",
    "Paige Quinn", "Quincy Rodriguez", "Rachel Scott", "Sebastian Taylor", "Trinity Underwood",
    "Umar Vasquez", "Violet Watson", "Wyatt Xander", "Ximena Young", "Yusuf Zimmerman",
    "Zara Anderson", "Anthony Brooks", "Brooke Campbell", "Christopher Dean", "Delilah Edwards",
    "Elijah Fisher", "Faith Graham", "Gavin Hall", "Hazel Irwin", "Isla Jackson",
    "James Kennedy", "Katherine Lewis", "Landon Mitchell", "Madison Nash", "Nathaniel Oliver",
    "Olive Perez", "Preston Reed", "Quinn Simmons", "Riley Torres", "Samantha Underwood",
    "Tyler Vaughn", "Ursula West", "Victor Xavier", "William York", "Zane Zimmerman"
];

const people = peopleName.map((name, index) => ({
    id: index + 1,
    full_name: name
}));

const groups = [
    "Alpha Squad", "Beta Team", "Gamma Force", "Delta Warriors", "Epsilon League",
    "Zeta Crew", "Eta Syndicate", "Theta Union", "Iota Alliance", "Kappa Circle",
    "Lambda Guardians", "Mu Brotherhood", "Nu Collective", "Xi Legion", "Omicron Clan",
    "Pi Order", "Rho Network", "Sigma Band", "Tau Tribe", "Upsilon Pack",
    "Phi Battalion", "Chi Fellowship", "Psi Front", "Omega Corps", "Crimson Vipers",
    "Shadow Strikers", "Thunder Wolves", "Iron Titans", "Neon Phantoms", "Frost Sentinels",
    "Blazing Hawks", "Venom Raptors", "Storm Chargers", "Celestial Knights", "Inferno Dragons",
    "Lunar Guardians", "Solar Pioneers", "Mystic Nomads", "Electric Panthers", "Cyber Samurai",
    "Echo Rangers", "Dusk Assassins", "Aqua Mariners", "Phantom Blades", "Titan Legion",
    "Gravity Hunters", "Starlight Crusaders", "Midnight Specters", "Golden Falcons", "Firestorm Elite"
];

const avartars = ["https://www.bootdey.com/img/Content/avatar/avatar1.png",
    "https://www.bootdey.com/img/Content/avatar/avatar2.png",
    "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    "https://www.bootdey.com/img/Content/avatar/avatar4.png",
    "https://www.bootdey.com/img/Content/avatar/avatar5.png",
    "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    "https://www.bootdey.com/img/Content/avatar/avatar7.png",
    "https://www.bootdey.com/img/Content/avatar/avatar8.png"
]

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean(): boolean {
    return Math.random() < 0.5;
}

function getRandomSublist<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export const searchUsers = (text: string) => {
    let res: any = [];
    text = text.toLowerCase();
    for (let i = 1; i < people.length; i++) {
        if (friendIndex.indexOf(i) >= 0) continue;
        const indexAvartar = getRandomInt(0, avartars.length + avartars.length / 3);
        if (people[i].full_name.toLowerCase().indexOf(text) >= 0) {
            res.push({
                id: people[i].id,
                full_name: people[i].full_name,
                avatar_url: indexAvartar < avartars.length ? avartars[indexAvartar] : "",
                is_active: getRandomBoolean()
            });
        }
        if (res.length >= 15) {
            break;
        }
    }
    return res;
}


let friendIndex = [2, 4, 6, 7, 9, 12, 19, 30, 32, 37, 44, 46, 52, 55, 73]
let avatarFriendIndex = [-1, 1, 2, 3, 4, -1, -1, 5, 6, -1, -1, 7, -1, -1, -1]

export const getlistFriends = () => {
    let res: any = [];
    for (let i = 0; i < friendIndex.length; i++) {
        res.push({
            id: people[friendIndex[i]].id,
            full_name: people[friendIndex[i]].full_name,
            avatar_url: avatarFriendIndex[i] >= 0 ? avartars[avatarFriendIndex[i]] : "",
            is_active: getRandomBoolean()
        });
    }
    return res;
}

export const searchFriends = (text: string) => {
    let res: any = [];
    let friends = getlistFriends();
    text = text.toLowerCase();
    for (let i = 0; i < friends.length; i++) {
        if (friends[i].full_name.toLowerCase().indexOf(text) >= 0) {
            res.push(friends[i]);
        }
    }
    return res;
}

export const getlistGroups = () => {
    let res: any = [];
    let friends = getlistFriends();
    let numGroups = getRandomInt(7, 20)
    let groupNames = getRandomSublist(groups, numGroups);
    for (let i = 0; i < numGroups; i++) {
        let numMembers = getRandomInt(3, 10)
        let members = getRandomSublist(friends, numMembers);
        res.push({
            id: i + 1,
            name: groupNames[i],
            members: members
        });
    }
    return res;
}

export const getUserbyId = async (userId: string) => {
    const res = await API.get(USER_API.getUser.replaceAll("{id}", userId))
    return res;
}
