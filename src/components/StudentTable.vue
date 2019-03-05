<template>
    <div class="tg-wrap">
        <h4>Student database</h4>
        <h6><i>hover over the fields for additional information</i></h6>
        <div class="grid-container">
            <label>Get all students that completed a specific exercise:</label>
            <div/>
            <input data-tooltip="Enter exercises like: 8_1, 8_2 and separate them with a comma. There can be from 0 to as many spaces as you want after the comma." class="exInput" type="text" v-model="exFilter" placeholder="exercise..."/>
            <div/>
            <div/>
            <button :disabled="this.exFilter===''" data-tooltip="Fetch only the students who have solved the entered exercise/s" @click="getStudentsWithExercise">Filter by exercise</button>
            
            <label>Filter students after you fetch them:</label>
            <div/>
            <input data-tooltip="This field is used on the results from the Fetch all students button. The results can be filtered by partial searching with a string entered here. Every property is checked during filtering." class="filterInput" type="text" v-model="studentFilter" placeholder="filter..."/>
            <div/>
            <div/>
            <button data-tooltip="Get all students from the 'database'" @click="getAllStudents">Fetch all students</button>

            <label>Enter the id of the student you want to modify: </label>
            <input data-tooltip="Enter the ID of the student that you want to modify" class="changeInput" type="text" placeholder="id..." v-model="changeId"/>
            <select v-model="ovSelected">
                <option data-tooltip="Select if you want to replace the value on a selected property or add to the existing one" disabled value="">Please select if you want to overwrite or add</option>
                <option>overwrite</option>
                <option>add</option>
            </select>
            <select v-model="fieldSelected">
                <option disabled value="">Please select the property you want to update</option>
                <option :disabled="this.ovSelected==='add'">name</option>
                <option>email</option>
                <option :disabled="this.ovSelected==='add'">dateOfBirth</option>
                <option>exercisesDone</option>
            </select>
            <input data-tooltip="Can be a single value or several values separated by a comma with or without spaces" class="changeInput" type="text" placeholder="new value..." v-model="changeField"/>
            <button @click="updateStudent" :disabled="this.changeId==='' || this.fieldSelected==='' || this.ovSelected==='' || this.changeField===''">Update student</button>


            <label class="lblDel">Enter the id of the student you want to delete:</label>
            <div/>
            <input class="deleteInput" type="text" placeholder="delete..." v-model="deleteField"/>
            <div/>
            <div/>
            <button :disabled="this.deleteField===''" @click="deleteStudent">Delete student</button>

            <label>Enter information of new student:</label>
            <input class="nameIn" type="text" placeholder="name..." v-model="newName"/>
            <input data-tooltip="Can be a single value or several values separated by a comma with or without spaces" class="emailIn" type="text" placeholder="email..." v-model="newEmail"/>
            <input data-tooltip="YYYY-MM-DD" class="dobIn" type="text" placeholder="YYYY-MM-DD" v-model="newDob"/>
            <input data-tooltip="Can be a single value or several values separated by a comma with or without spaces" class="exerDoneIn" type="text" placeholder="8_1, 8_1_2..." v-model="newExercisesDone"/>
            <button :disabled="this.newName==='' || this.newEmail==='' || this.newDob==='' || this.newExercisesDone===''" @click="uploadStudent">Upload student</button>
        </div>
        <table class="tg" style="undefined;table-layout: fixed; margin: auto;">
            <colgroup>
            <col style="width: 60px">
            <col style="width: 91px">
            <col style="width: 100px">
            <col style="width: 91px">
            </colgroup>
            <tr>
                <th class="tg-49eq">Student No.</th>
                <th class="tg-49eq">Name</th>
                <th class="tg-49eq">Email</th>
                <th class="tg-49eq">Birthdate</th>
            </tr>
            <tr v-for="student in students" :key="student.id">
                <td class="tg-baqh">{{student.id}}</td>
                <td class="tg-baqh">{{student.name}}</td>
                <td class="tg-baqh">{{student.email | emailList}} </td>
                <td class="tg-baqh">{{student.dateOfBirth | date}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
var tooltip = require('tooltip')
var config  = {
  showDelay: 100,
  style: {
    padding: 2
  }
}
 
tooltip(config)
export default {
    name: "StudentTable",
    data() {
        return {
            allStudents: [],
            students: [],
            studentFilter: '',
            exFilter: '',
            ovSelected: '',
            fieldSelected: '',
            changeId: '',
            changeField: '',
            deleteField: '',
            newName: '',
            newEmail: '',
            newDob: '',
            newExercisesDone: ''
        }
    },
    methods: {
        async getStudentsWithExercise() {
            if (!this.exFilter) return await Promise.resolve(this.students = [])
            return await axios.get(`http://localhost:3000/students?exercisesDone_like=${this.exFilter}`) // return await redundant
                .then(res => {
                    this.students = res.data
                    console.log(res)
                }).catch(e => console.log(`Error: ${e}`))
        },
        async getAllStudents() {
            return await axios.get('http://localhost:3000/students')
                .then(res => {
                    this.students = res.data
                    this.allStudents = this.students
                }).catch(e => console.log(`Error: ${e}`))
        },
        async updateStudent() {
            if (this.fieldSelected==='dateOfBirth') {
                if (!this.verifyDate(this.changeField)) {
                    return;
                }
            }
            const config = { headers: {'Content-Type': 'application/json'} };
            switch (this.ovSelected) {
                case 'overwrite':
                    return await axios.patch(`http://localhost:3000/students/${this.changeId}`, {
                        [`${this.fieldSelected}`] : this.adjustValue()
                        }, config)
                            .then(response => {
                                console.log(response)
                            }).catch(e => console.log(`Error: ${e}`));
                    break;
                case 'add':
                    let st = await axios.get(`http://localhost:3000/students/${this.changeId}`)
                        .then(res => res.data).catch(e => console.log(`Error: ${e}`));
                    return await axios.patch(`http://localhost:3000/students/${this.changeId}`, {
                        [`${this.fieldSelected}`] : [...st[`${this.fieldSelected}`], ...this.changeField.split(/,\s*/g)]
                        }, config)
                            .then(response => {
                                console.log(response)
                            }).catch(e => console.log(`Error: ${e}`));
                    break;
                default:
                    break;
            }
            
        },
        async deleteStudent() {
            return await axios.delete(`http://localhost:3000/students/${this.deleteField}`).catch(e => console.log(`Error: ${e}`))
        },
        async uploadStudent() {
            const config = { headers: {'Content-Type': 'application/json'} };
            if (!this.verifyDate(this.newDob)) { 
                return;
            }
            return await axios.post('http://localhost:3000/students/', {
                name: this.newName,
                email: this.newEmail.split(/,\s*/g),
                dateOfBirth: this.newDob,
                exercisesDone: this.newExercisesDone.split(/,\s*/g)
            }, config)
                .then(response => {
                        console.log(response)
                }).catch(e => console.log(`Error: ${e}`))
        },
        adjustValue() {
            // this.changeField contains the new data we want to add
            switch (this.fieldSelected) {
                case 'name':
                case 'dateOfBirth':
                    return this.changeField
                    break;
                case 'email':
                case 'exercisesDone':
                    return [...this.changeField.split(/,\s*/g)]
                    break;
                default:
                    break;
            }
        },
        verifyDate(fld) {
            console.log(fld)
            if (!(new RegExp(/\d{4}-\d\d-\d\d/g).test(fld))) {
                alert("Date not valid")
                console.log("Date not valid!")
                return false;
            } else {
                return true;
            }
        }
    },
    // mounted() { // if we want to fetch all students on load
    //     this.getAllStudents()
    // }
    watch: {
        studentFilter: {
            handler: function() {
                this.students = this.allStudents.filter(student => {
                    for (var i of Object.values(student)) {
                        try {
                            if (new RegExp(this.studentFilter, 'i').test(i)) {
                                return student
                            }
                        } catch (error) {
                            console.log("Invalid regex, cannot filter with the entered string!")
                            break;
                        }
                        
                    }
                })
            },
            deep: true,
            immediate: true
        },
        ovSelected: function() {
            this.fieldSelected = ''
        }
    }
}
</script>

<style scoped>

    .grid-container > label {
        text-align: left
    }

    .grid-container > select, input {
        width: 100%;
        margin: auto;
    }

    .grid-container > button {
        margin: auto;
        width: 100%;
        text-align: center;
        background-color: bisque;
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto;
        grid-column-gap: 20px;
        grid-row-gap: 30px;
        margin-bottom: 20px;
        background-color: cadetblue;
        padding: 1%;
    }

    .tg-wrap {
        border: 1px solid black;
        border-radius: 10px;
        padding: 15px;
    }

    .tg  {
        border-collapse:collapse;
        border-spacing:0;
        border-color:#bbb;
        width: 100%;
    }

    .tg td {
        font-family:Arial, sans-serif;
        font-size:14px;
        padding:10px 5px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:#bbb;
        color:#594F4F;
        background-color:#E0FFEB;
    }

    .tg th {
        font-family:Arial, sans-serif;
        font-size:14px;
        font-weight:normal;
        padding:10px 5px;
        border-style:solid;
        border-width:1px;
        overflow:hidden;
        word-break:normal;
        border-color:#bbb;
        color:#493F3F;
        background-color:#9DE0AD;
    }

    .tg .tg-baqh {
        text-align:center;
        vertical-align:center
    }

    .tg .tg-49eq {
        font-size:15px;
        font-family:"Trebuchet MS", Helvetica, sans-serif !important;;
        text-align:center;
        vertical-align:center
    }

    @media screen and (max-width: 767px) {
        .tg {
            width: auto !important;
        }
        .tg col {
            width: auto !important;
        }
        .tg-wrap {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }
    }

    h4, h6 {
        margin: 10px;
    }

    label {
        font-weight: bold;
    }
</style>
