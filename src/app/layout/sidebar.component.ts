import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_ITEMS, NavigationItem } from '../config/navigation.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside 
      [class]="sidebarClasses()"
      class="bg-gray-800 text-gray-100 transition-all duration-300 ease-in-out"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 class="text-xl font-bold text-white">DBA System</h2>
        <button 
          (click)="onToggle()"
          class="lg:hidden text-gray-400 hover:text-white"
        >
          <span class="material-icons">close</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        @for (item of navigationItems; track item.path) {
          <div>
            <!-- Main Navigation Item -->
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-blue-600 text-white"
              [routerLinkActiveOptions]="{exact: false}"
              class="flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200 cursor-pointer"
              (click)="item.children && toggleSubmenu(item.path)"
            >
              <span class="material-icons mr-3">{{ item.icon }}</span>
              <span class="flex-1">{{ item.label }}</span>
              @if (item.children) {
                <span class="material-icons text-sm">
                  {{ expandedMenus()[item.path] ? 'expand_less' : 'expand_more' }}
                </span>
              }
            </a>

            <!-- Submenu -->
            @if (item.children && expandedMenus()[item.path]) {
              <div class="ml-4 mt-2 space-y-1">
                @for (child of item.children; track child.path) {
                  <a
                    [routerLink]="child.path"
                    routerLinkActive="bg-blue-600 text-white"
                    class="flex items-center px-4 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    <span class="material-icons text-sm mr-2">chevron_right</span>
                    {{ child.label }}
                  </a>
                }
              </div>
            }
          </div>
        }
      </nav>

      <!-- Sidebar Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span class="material-icons text-white">person</span>
          </div>
          @if (isOpen()) {
            <div class="flex-1">
              <p class="text-sm font-medium text-white">Admin</p>
              <p class="text-xs text-gray-400">admin@dba.com</p>
            </div>
          }
        </div>
      </div>
    </aside>

    <!-- Mobile Overlay -->
    @if (isOpen()) {
      <div 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        (click)="onToggle()"
      ></div>
    }
  `,
  styles: [`
    aside {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 50;
    }

    @media (min-width: 1024px) {
      aside {
        position: relative;
      }
    }
  `]
})
export class SidebarComponent {
  isOpen = input.required<boolean>();
  toggle = output<void>();

  navigationItems = NAVIGATION_ITEMS;
  expandedMenus = signal<Record<string, boolean>>({});

  sidebarClasses() {
    return this.isOpen() 
      ? 'w-64 translate-x-0' 
      : 'w-64 -translate-x-full lg:w-20 lg:translate-x-0';
  }

  toggleSubmenu(path: string) {
    this.expandedMenus.update(menus => ({
      ...menus,
      [path]: !menus[path]
    }));
  }

  onToggle() {
    this.toggle.emit();
  }
}
