<script setup lang="ts">
import ResponsivePage from '@/components/ResponsivePage.vue'
import { AppName } from '@/constants/global'
import { useMeta } from 'quasar'

useMeta({ title: `${AppName} - List Workout` })
</script>

<template>
    <ResponsivePage>
        <div class="text-h6">
            Warmup
            <span class="text-caption text-warning"> 5 minutes</span>
        </div>

        <ul>
            <li>Airbike Cardio <span class="text-caption text-positive"> 5 minutes</span></li>
        </ul>

        <div class="text-h6">
            Off Day Workout
            <span class="text-caption text-warning"> 15 minutes</span>
        </div>

        <ul>
            <li>
                Plank
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
            <li>
                Side Plank
                <span class="text-caption text-positive"> 1 minute ea.</span>
            </li>
            <li>
                (A) Pull-ups
                <span class="text-caption text-positive"> 5 x 3</span>
            </li>
            <li>
                (B) Push-ups
                <span class="text-caption text-positive"> 10 x 3</span>
            </li>
            <li>
                Shoulder Over-and-backs
                <span class="text-caption text-positive"> 15 reps</span>
            </li>
            <li>
                Bar Hangs
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
        </ul>

        <div class="text-h6">
            Stretches
            <span class="text-caption text-warning"> 15 minutes</span>
        </div>

        <ul>
            <li>
                Pigeon
                <span class="text-caption text-positive"> 1 minute ea.</span>
            </li>
            <li>
                Pancake
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
            <li>
                Butterfly
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
            <li>
                Frog
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
            <li>
                Quad
                <span class="text-caption text-positive"> 1 minute ea.</span>
            </li>
            <li>
                Calves
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
            <li>
                Forward Fold
                <span class="text-caption text-positive"> 1 minute</span>
            </li>
            <li>
                Chest
                <span class="text-caption text-positive"> 30 seconds</span>
            </li>
        </ul>

        <div class="text-h6">
            Carpal Tunnel Routine
            <span class="text-caption text-warning"> 5 minutes</span>
        </div>

        <ul>
            <li>
                Median Nerve Sliders
                <span class="text-caption text-positive"> 15 reps</span>
            </li>
            <li>
                Fist Clinch, Knuckle, Finger Opens
                <span class="text-caption text-positive">15 reps</span>
            </li>
            <li>
                Gentle Wrist Stretch
                <span class="text-caption text-positive">15 reps</span>
            </li>
        </ul>
    </ResponsivePage>
</template>
