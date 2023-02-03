<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Edit Contact</p>
                <p class=" fst-italic text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto assumenda nobis delectus voluptate inventore minima praesentium consequatur, harum voluptates error saepe qui amet quasi aliquid distinctio quas, ut laudantium placeat.</p>
            </div>
        </div>
    </div>

    <!--Spinner-->
    <div v-if="loading">
        <div class="container">
            <div class="row">
                <div class="col">
                    <SpinneR/>
                </div>
            </div>
        </div>
    </div>

    <!--Error Message-->
    <div v-if="!loading && errorMessage">
        <div class="container mt-3">
            <div class="row">
                <div class="col">
                    <p class="h4 text-danger fw-bold">{{ errorMessage }}</p>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-3">
        <div class="row">
            <div class="col-md-4">
                <form @submit.prevent="updateSubmit()">
                    <div class="mb-2">
                        <input required v-model="contact.name" type="text" class=" form-control ctxtin" placeholder="Name">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.photo" type="text" class=" form-control ctxtin" placeholder="Photo URL">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.email" type="email" class=" form-control ctxtin" placeholder="Email">
                    </div>
                    <div class="mb-2">
                        <input  required v-model="contact.mobile" type="number" class=" form-control ctxtin" placeholder="Mobile">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.company" type="text" class=" form-control ctxtin" placeholder="Company">
                    </div>
                    <div class="mb-2">
                        <input required v-model="contact.title" type="text" class=" form-control ctxtin" placeholder="Title">
                    </div>
                    <div class="mb-2">
                        <select required v-model="contact.groupId" class="form-control" v-if="groups.length > 0">
                            <option value="">Select Group</option>
                            <option :value="group.id" v-for="group of groups" :key="group.id">{{ group.name }}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <input type="submit" class=" form btn btn-success" value="Update">
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img">
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService';
import SpinneR from '../components/Spinner.vue';

export default{
        name: "EditContact",
        components: {
        SpinneR
    },
        data : function (){
            return{
                contactId : this.$route.params.contactId,
                loading : false,
                contact: {
                    name : '',
                    photo : '',
                    email : '',
                    mobile : '',
                    company : '',
                    title : '',
                    groupId : ''
                },
                errorMessage : null,
                groups : []
            }
        },
        created : async function(){
            try {
                this.loading = true;
                let response = await ContactService.getContacts(this.contactId);
                let groupResponse = await ContactService.getAllGroups();
                this.contact = response.data;
                this.groups = groupResponse.data;
                this.loading = false;
            } catch (error) {
                this.errorMessage = error;
                this.loading = false;
            }
        },
        methods : {
            updateSubmit : async function(){
                try {
                    let response = await ContactService.updateContact(this.contact, this.contactId);
                    if (response) {
                        return this.$router.push('/');
                    } else {
                        return this.$router.push(`/contacts/edit/${this.contactId}`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<style scoped>
    ::placeholder { color: rgb(12, 131, 65); font-weight: bold; }
    select{
        color: rgb(12, 131, 65); font-weight: bold;
    }
    .ctxtin{
        color: rgb(18, 151, 113);
        font-weight: bold;
    }
</style>