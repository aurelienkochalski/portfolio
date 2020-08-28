import { MongoClient } from "mongodb";
import {DB_URI, DB_NAME} from "../config";

const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Retrieves all data
export async function getAll() {

    if (!client.isConnected()) await client.connect();

    let data = {};

    let dataInfos = await client.db(DB_NAME).collection("infos").findOne();
    data.infos = dataInfos;

    let dataContacts = await client.db(DB_NAME).collection("contacts").find({}).toArray();
    data.contacts = dataContacts;

    let dataProjects = await client.db(DB_NAME).collection("projects").find({}).toArray();
    data.projects = dataProjects;

    let dataSkills = await client.db(DB_NAME).collection("skills").find({}).sort({ order : 1 }).toArray();
    data.skills = dataSkills;

    return JSON.stringify(data);
}

// Retrieves all projects
export async function getProjects() {

    if (!client.isConnected()) await client.connect();

    let data = await client.db(DB_NAME).collection("projects").find({}).toArray();
    return data;
}

// Retrieve a project by title
export async function getProject(projectTitle) {

    if (!client.isConnected()) await client.connect();

    let data = await client.db(DB_NAME).collection("projects").findOne({title: projectTitle});
    return JSON.stringify(data);
}
