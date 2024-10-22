<template>
	<main class="content">
		<section class="desk">
			<!--      Шапка доски-->
			<div class="desk__header">
				<h1 class="desk__title">Design Coffee Lab</h1>
				<div class="desk__filters">
					<div class="desk__user-filter">
						<ul class="user-filter">
							<li
								v-for="user in users"
								:key="user.id"
								:title="user.name"
								class="user-filter__item"
							>
								<a class="user-filter__button">
									<img
										:src="getImage(user.avatar)"
										alt="Аватар юзера"
										width="24"
										height="24"
									/>
								</a>
							</li>
						</ul>
					</div>
					<div class="desk__meta-filter">
						<ul class="meta-filter">
							<li
								v-for="status in STATUSES"
								:key="status.value"
								class="meta-filter__item"
							>
								<a
									class="meta-filter__status"
									:class="`meta-filter__status meta-filter__status--color meta-filter__status--${status.value}`"
									:title="status.label"
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!--      Колонки и задачи-->
			<div
				v-if="columns.length"
				class="desk__columns"
			>
				<div
					v-for="column in columns"
					:key="column.id"
					class="column"
				>
					<h2 class="column__name">{{ column.title }}</h2>
					<div class="column__target-area">
						<div
							v-for="task in columnTasks"
							class="column__task"
						>
							<div class="task">
								<div class="task__user">
									<div class="task__avatar">
										<img
											:src="getImage(task.user.avatar)"
											alt="задача"
											width="20"
											height="20"
										/>
									</div>
									{{ task.user.name }}
								</div>

								<div class="task__statuses">
									<span
										v-if="task.status"
										class="task__status"
										:class="`task__status--${task.status}`"
									/>
									<span
										v-if="task.timeStatus"
										class="task__status"
										:class="`task__status--${task.timeStatus}`"
									/>
								</div>

								<h5
									class="task__title"
									:class="{ 'task__status--first': !task.user }"
								>
									{{ task.title }}
								</h5>
								<ul
									v-if="task.tags && task.tags.length"
									class="task__tags"
								>
									<li
										v-for="(tag, idx) in task.tags"
										:key="idx"
									>
										<span class="tag tag--blue"> {{ tag }} </span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--      Пустая доска-->
			<p
				v-else
				class="desk__emptiness"
			>
				Пока нет ни одной колонки
			</p>
		</section>
	</main>
</template>

<script setup lang="ts">
import users from "@/mock/users.json";
import columns from "@/mock/columns.json";
import tasks from "@/mock/tasks.json";
import { STATUSES } from "@/common/constants";
import { normalizeTask, getTagsArrayFromStaring } from "@/common/helpers";

const getImage = (image: string): string =>
	new URL(`../assets/img/${image}`, import.meta.url).href;

const normalizeTasks = tasks.map((task) => normalizeTask(task));

const columnTasks = normalizeTasks
	.filter(({ columnId }) => columnId)
	.reduce((acc, task) => {
		task.tags = getTagsArrayFromStaring(task.tags);
		if (acc[task.columnId]) {
			acc[task.columnId].push(task);
		} else {
			acc[task.columnId] = [task];
		}
		return acc;
	}, {});
</script>
