<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">View Contact</p>
                <p class=" fst-italic text-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, debitis. Iure, quae sapiente nulla minima inventore vero libero nihil commodi, voluptatum accusantium totam suscipit omnis illum nemo consectetur optio perferendis.</p>
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

    <div class="container" v-if="!loading && IsDone()">
        <div class="row align-items-center">
            <div class="col-md-4">
                <img :src="contact.photo" alt="" class="contact-img-big">
            </div>
            <div class="col-md-6">
                <ul class="list-group">
                    <li class="list-group-item">name : <span class="fw-bold">{{contact.name}}</span></li>
                    <li class="list-group-item">Email : <span class="fw-bold">{{contact.email}}</span></li>
                    <li class="list-group-item">Mobile : <span class="fw-bold">{{contact.mobile}}</span></li>
                    <li class="list-group-item">Company : <span class="fw-bold">{{contact.company}}</span></li>
                    <li class="list-group-item">Title : <span class="fw-bold">{{ contact.title }}</span></li>
                    <li class="list-group-item">Group : <span class="fw-bold">{{group.name}}</span></li>
                </ul>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <RouterLink to="/" class="btn btn-success"><i class="fa fa-arrow-alt-circle-left"></i> Back</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService';
import SpinneR from '../components/Spinner.vue';

    export default{
        name: "ViewContact",
        components: {
        SpinneR
    },
        data : function(){
            return{
                contactId : this.$route.params.contactId,
                loading : false,
                contact : {},
                errorMessage : null,
                group : {}
            }
        },
        created : async function(){
            try {
                this.loading = true;
                let response = await ContactService.getContacts(this.contactId);
                let groupResponse = await ContactService.getGroup(response.data);
                this.contact = response.data;
                this.group = groupResponse.data;
                this.loading = false;

            } catch (error) {
                this.errorMessage = error;
                this.loading = false;
            }
        },
        methods : {
            IsDone : function (){
                return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
            }
        }
    }
</script>

<style scoped>

</style>