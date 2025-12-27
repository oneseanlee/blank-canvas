import { useState } from 'react';
import { LogOut, User, Book, Heart, Clock, Keyboard, Map, Menu, X, LayoutGrid, List } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UnifiedHeaderProps {
  showGuide: boolean;
  onToggleGuide: () => void;
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  showRecentlyAdded: boolean;
  onToggleRecentlyAdded: () => void;
  favoritesCount: number;
  favoritesLoaded: boolean;
  preferredView: 'card' | 'compact';
  onViewChange: (view: 'card' | 'compact') => void;
}

export function UnifiedHeader({
  showGuide,
  onToggleGuide,
  showFavoritesOnly,
  onToggleFavorites,
  showRecentlyAdded,
  onToggleRecentlyAdded,
  favoritesCount,
  favoritesLoaded,
  preferredView,
  onViewChange
}: UnifiedHeaderProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const showShortcuts = () => {
    toast({
      title: '⌨️ Keyboard Shortcuts',
      description: '/ - Focus search • f - Toggle favorites • r - Recently added • v - Toggle view • ? - Show shortcuts',
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b-2 border-primary/30 shadow-lg shadow-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/50">
              <Book className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">
                Vibe Coding Bible
              </h1>
              <p className="text-xs font-medium text-muted-foreground hidden sm:block">
                Your AI coding companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* View Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1 mr-2">
              <Button
                variant={preferredView === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('card')}
                className="h-7 px-2"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={preferredView === 'compact' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('compact')}
                className="h-7 px-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant={showGuide ? "default" : "outline"}
              size="sm"
              onClick={onToggleGuide}
            >
              <Map className={`h-4 w-4 mr-2 ${showGuide ? 'fill-current' : ''}`} />
              SOP Guide
            </Button>

            <Button
              variant={showRecentlyAdded ? "default" : "outline"}
              size="sm"
              onClick={onToggleRecentlyAdded}
            >
              <Clock className={`h-4 w-4 mr-2 ${showRecentlyAdded ? 'fill-current' : ''}`} />
              Recent
            </Button>

            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={onToggleFavorites}
              disabled={!favoritesLoaded}
            >
              <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              ({favoritesCount})
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={showShortcuts}
            >
              <Keyboard className="h-4 w-4" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="hidden lg:inline text-sm text-muted-foreground truncate max-w-[120px]">
                    {user?.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem disabled className="text-muted-foreground">
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 space-y-2">
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={preferredView === 'card' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange('card')}
                  className="h-7 px-2"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={preferredView === 'compact' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange('compact')}
                  className="h-7 px-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              variant={showGuide ? "default" : "outline"}
              size="sm"
              onClick={() => { onToggleGuide(); setMobileMenuOpen(false); }}
              className="w-full justify-start"
            >
              <Map className="h-4 w-4 mr-2" />
              SOP Guide
            </Button>

            <Button
              variant={showRecentlyAdded ? "default" : "outline"}
              size="sm"
              onClick={() => { onToggleRecentlyAdded(); setMobileMenuOpen(false); }}
              className="w-full justify-start"
            >
              <Clock className="h-4 w-4 mr-2" />
              Recently Added
            </Button>

            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => { onToggleFavorites(); setMobileMenuOpen(false); }}
              disabled={!favoritesLoaded}
              className="w-full justify-start"
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites ({favoritesCount})
            </Button>

            <div className="pt-2 border-t border-border/50">
              <div className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {user?.email}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
