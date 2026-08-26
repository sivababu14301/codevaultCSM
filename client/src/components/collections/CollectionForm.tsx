import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const collectionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  description: z.string().max(200, 'Description must be less than 200 characters').optional(),
  isPublic: z.boolean().default(false),
});

export type CollectionFormData = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
  initialData?: Partial<CollectionFormData>;
  onSubmit: (data: CollectionFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading = false,
  submitLabel = "Save"
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      isPublic: initialData?.isPublic || false,
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Collection Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5DF6] focus:border-transparent outline-none transition-all"
          placeholder="e.g., React Hooks"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D5DF6] focus:border-transparent outline-none transition-all resize-none"
          placeholder="What is this collection about?"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isPublic"
          type="checkbox"
          {...register('isPublic')}
          className="w-4 h-4 text-[#6D5DF6] border-gray-300 rounded focus:ring-[#6D5DF6]"
        />
        <label htmlFor="isPublic" className="text-sm text-gray-700">
          Make this collection public
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6D5DF6] hover:bg-[#5b4be2] text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};
